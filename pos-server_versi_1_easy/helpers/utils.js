//! utils

// untuk generate no.order secara random dengan karakter awal berdasarkan prefix
// contoh: T001, T213, T335, T132

exports.randomOrderNumber = () => {
    const prefix = 'T', randomNumber = Math.floor(Math.random() * 1000) // 👈 4 digit max
    return prefix + randomNumber
}