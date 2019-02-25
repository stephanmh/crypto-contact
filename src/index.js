require('./styles/index.scss');
var openpgp = require('openpgp');

import PopperJs from 'popper.js';
import jquery from 'jquery';


const publicKeyString = `-----BEGIN PGP PUBLIC KEY BLOCK-----

mQENBFxeueoBCACjmsJVkuCEP9G1BNTK7NEjdniwEUJI3kMu4KB8Yy8VySJSzMQU
lR9BA98+qu9IiogU4z0HBJzIPKMtDDRB/faaJRRV5qDzVD+9vh48/NQafy0NU1hV
VfII6f69kDfjZ5hf+8eJiWk4UlzjmkmT4mG8sdwXyW/vyWA+lByogqtn6UTHr2d9
+Gkl8vk7bCwJIhBOvkCT7QFBTyP4oOKcyLdJDtzuIGpTfQ19HvQ2VW84QBmi8Xw8
ysLjZOJcDX7kNG8iPM43Hif4SKLG1ZtUeGJNAaGTXyLgmJsrqxM1/LvjHdmeyDfV
db67i/YsXbqSlZGubzjTej3artC7K+hgJ/+bABEBAAG0EXN0ZXBoYW4gPGZAdm8u
cnM+iQFOBBMBCAA4FiEEkSlmXrVP2MmM3WUGORlRMKBm3vAFAlxeueoCGwMFCwkI
BwIGFQgJCgsCBBYCAwECHgECF4AACgkQORlRMKBm3vCcRQgAo0o7wbO2KVWs8kC0
oV8XVHY53aRuIFXYTsGYWrUQYAu/hKssk+ZyX7dMJft14Xm96/Md8HJzt7kPK4cQ
QT7hIuAesv/neYK2yKP33QGbkX5vd5mkEBVxvdL80LHFaUPCm10SMqVlcifGtcr2
HKm/6nYZovpM3IfPKvn4rYth9Zx4rYnH3S3YLqSOVEXjX7AtoKXtG++wjZcRFfsZ
QnzJS8Nk79bBrUYk7E0i7qWqqC1pS7tQbbNWh88L7KhveBX9jtVawTQQH4/TIL4T
lkirzcGuiRyQdN4jf5kryl4PzeYOIwbyt3Z1S13iIqYlHmC08zlug6f1DH0iHArQ
O0E6sbkBDQRcXrnqAQgAwW/z4e4PhrhHw9b8ZRVKZoVXLlOZlvRHAzXb8pne28+n
BfMZG587RF6LaU3AaeyumkQgSZaw1CvEiDoWhebCRkDrEayWFnbg1cBjwemiNxRW
92MMsoN05qGDSwoNG3P+Aa8NHQGB36n09IJb8FdUjSCleDprMlNJymzUrCbs7ZaL
QaA+OaAahnsCKHpYTelfzfkHEJitc3RpjIl5n9fjQvCpWOz5oPoE+5ewKvlq+71c
kALMZYaqI+0RAOprUjwyS591cd3EsrSWJmZP4wdaHA8HpXW3TUCxa+cgQFrAaKjb
UKtImCsRhAkMGfo7Gpz7qKjKdcudDKZN5ysdIzOKjQARAQABiQE2BBgBCAAgFiEE
kSlmXrVP2MmM3WUGORlRMKBm3vAFAlxeueoCGwwACgkQORlRMKBm3vAk7ggAjAyG
aM7JXflEhGriwAhpdFgWoMlmY3pDdVriUkkV6ELyi5AG9PAD5IplCsNMyL85Ko7D
IpOvPEHdr3gDsHdbTPK4uxkyHEtxeKd2It3VoZF1KNI042d5adCf5qzbfPPE+0+p
uecmcwrDdmbA5Fke5Mx9fdo6aSbjJ0LEjGfIBoIKovr9B8sjCPIcPqEapNDhOzeV
Qzd12ePLyD8+ogKT/IbnKKFpxkWdzgzuGsLvOp7WOzc15BMjq5NPILUgesHbgStu
668SluvxfIw0ji50+kjrAfFvKnAirz/IT6JkbGkxbYM9M1vOGvt0q5s98Ky2Dszt
QJ0Sy7yITRFZGdY5sQ==
    =DqeQ
-----END PGP PUBLIC KEY BLOCK-----`;

function OnSubmit() {
    encryptDecryptFunction().finally();
}

const encryptDecryptFunction = async () => {

    const options = {
        message: openpgp.message.fromText('From: ' + document.getElementById('email').value + 'nn' + document.getElementById('message').value),
        publicKeys: (await openpgp.key.readArmored(publicKeyString)).keys,
    };

    openpgp.encrypt(options).then(ciphertext => {
        jquery("#message").val(ciphertext.data);
    });
};


const button = document.getElementById('encrypt');

if (button.addEventListener) {
    button.addEventListener('click', OnSubmit, false);
} else if (button.attachEvent) {
    button.attachEvent('onclick', OnSubmit);
}


