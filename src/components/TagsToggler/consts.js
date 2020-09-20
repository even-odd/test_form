// export const ST_CHECKED =
export const VECTOR_COMMON = 'common';
export const VECTOR_ADDRESS = 'address';
export const VECTOR_PASSPORT = 'passport';

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
        birthday: null,
        phone: '',
        sex: '',
        groupOfClient: new Set(), // хранятся только выделенные группы
        // groupOfClient: [], // хранятся только выделенные группы
        doctor: '',
    };
}

export function getAddressInitialState () {
    return {
        index: '',
        country: '',
        region: '',
        city: '',
        street: '',
        house: ''
    };
}

export const DOC_TYPES = ['Паспорт', 'Свидетельство о рождении', 'Вод. удостоверение'];
export function getPassportInitialState () {
    return {
        typeOfDocument: '',
        series: '',
        numberOfDocument: '',
        issuedBy: '', // кем выдан
        issuedDate: null
    };
}

