const io = require('./server.js').io;

const MAX_ANGLES_NUM = 128;

let all_angles = [0.3, 0.85];

io.on('connection', (socket) => {
    //console.log(socket);
    socket.on('Entry', (angle) => {
        addToAngleStack(angle);
    });
});


const addToAngleStack = (angle) => {
    //If stack is full, remove the last element
    if (all_angles.length === MAX_ANGLES_NUM) {
        all_angles.shift();
    }

    all_angles.push(angle);

    //console.log(all_angles);
}


//The main hash function that is used to get a random number
const HashFunction3 = (M, M_prime) => {

    const G = (a, x) => {
        if (x > 0 && x <= a) {
            return x / a;
        }
        else if (x > a && x < 1) {
            return (1 - x) / (1 - a);
        }
    }

    let s_1 = 0.1;
    let t_1 = 0.2;
    let s_2 = 0.3;
    let t_2 = 0.4;
    let s_3 = 0.5;
    let t_3 = 0.6;

    for (let i = 0; i < M.length; i++) {
        let a_1 = (s_1 + M[i]) % 1;
        let x_1 = (t_1 + M_prime[i]) % 1;

        let a_2 = (s_2 + M[i]) % 1;
        let x_2 = (t_2 + M_prime[i]) % 1;

        let a_3 = (s_3 + M[i]) % 1;
        let x_3 = (t_3 + M_prime[i]) % 1;

        for (let j = 0; j < 75; j++) {
            const g_1 = G(a_1, x_1);
            const g_2 = G(a_2, x_2);
            const g_3 = G(a_3, x_3);

            x_1 = 0.95 * g_1 + 0.0025 * (g_2 + g_3);
            x_2 = 0.95 * g_2 + 0.0025 * (g_1 + g_3);
            x_3 = 0.95 * g_3 + 0.0025 * (g_2 + g_2);
        }

        const new_t1 = (x_1 + s_1) % 1;
        const new_t2 = (x_2 + s_2) % 1;
        const new_t3 = (x_3 + s_3) % 1;

        const min_1 = Math.min((x_1 + M_prime[i]) % 1, t_1);
        const min_2 = Math.min((x_2 + M_prime[i]) % 1, t_2);
        const min_3 = Math.min((x_3 + M_prime[i]) % 1, t_3);

        const max_1 = Math.max((x_1 + M_prime[i]) % 1, t_1);
        const max_2 = Math.max((x_2 + M_prime[i]) % 1, t_2);
        const max_3 = Math.max((x_3 + M_prime[i]) % 1, t_3);

        const new_s1 = G(min_1, max_1);
        const new_s2 = G(min_2, max_2);
        const new_s3 = G(min_3, max_3);

        s_1 = new_s1;
        s_2 = new_s2;
        s_3 = new_s3;
        t_1 = new_t1;
        t_2 = new_t2;
        t_3 = new_t3;
    }

    return getMentissa(s_1).substring(0, 40) + getMentissa(s_2).substring(0, 40) + getMentissa(s_3).substring(0, 48) + getMentissa(t_1).substring(0, 48) + getMentissa(t_2).substring(0, 40) + getMentissa(t_3).substring(0, 40)

}



const getRandomNumber = () => {

    //Make a deep copy of the angles to avoid race conditions
    const all_angles_copy = [...all_angles];

    let M = []
    let M_prime = []


    for (let i = 0; i < all_angles_copy.length; i++) {
        angle_mantissa = getMentissa(all_angles_copy[i])
        angle_mantissa_reverse = reverse(angle_mantissa)
        M.push(calcMentissaToFloat(angle_mantissa))
        M_prime.push(calcMentissaToFloat(angle_mantissa_reverse))
    }

    console.log(M)
    console.log(M_prime)
    console.log(HashFunction3(M, M_prime));
}

function reverse(s) {
    return s.split("").reverse().join("");
}


const getMentissa = (s) => {
    s_bits = s.toString(2)
    menstissa = s_bits.substring(s_bits.indexOf("1") + 1, s_bits.length).replace(".", "");

    if (menstissa.length < 52) {
        menstissa = menstissa + "0".repeat(52 - menstissa.length);
    }

    //console.log(menstissa)

    return menstissa;
}


const calcMentissaToFloat = (m) => {
    let output = 0;
    for (let i = 0; i < m.length; i++) {
        output += parseInt(m.charAt(i)) * (2 ** (-(i + 1)))
    }

    return output
}

setInterval(getRandomNumber, 3000)

//console.log((0.456).toString(2))
//getMentissa(85.125)

//console.log(calcMentissaToFloat("00011"))