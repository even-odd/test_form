
export const COMMON_REQUIRED = ['firstName', 'secondName', 'birthday', 'phone', 'groupOfClient'];
export function getCommonInitialState () {
    return {
        firstName: '',
        secondName: '',
        patronymic: '', // отчество
        birthday: null, // TODO: определиться как делать
        phone: '',
        sex: '',
        groupOfClient: -1, // TODO: сделать числовые константы
        doctor: -1, // TODO: сделать список врачей
        noSMS: false,
    };
}

export const ADDRESS_REQUIRED = ['city'];
export function getAddressInitialState () {
    return {
        index: -1,
        country: '',
        region: '',
        city: '',
        street: '',
        house: ''
    };
}

export const PASSWORD_REQUIRED = ['typeOfDocument', 'issuedDate'];
export function getPassportInitialState () {
    return {
        typeOfDocument: -1,// TODO: сделать числовые константы
        series: -1,
        number: -1,
        issuedBy: '', // кем выдан
        issuedDate: -1
    };
}

