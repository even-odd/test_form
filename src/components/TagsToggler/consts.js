// export const ST_CHECKED =

export const DOCTORS = ['Иванов', 'Захаров', 'Чернышева'];
export const GROUPS_CLIENT = {
    vip: 'VIP',
    problematic: 'Проблемные',
    oms: 'ОМС'
};

export function getSimpleGroupsObj (value) {
    let result = {};
    for (let key in GROUPS_CLIENT) {
        result[key] = value;
    }

    return result;
}

export function getCommonInitialState () {
    return {
        firstName: '',
        secondName: '',
        patronymic: '', // отчество
        birthday: null, // TODO: определиться как делать
        phone: '',
        sex: '',
        groupOfClient: new Set(), // хранятся только выделенные группы
        // groupOfClient: [], // хранятся только выделенные группы
        doctor: -1, // TODO: сделать список врачей
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

