import apiAxios from './axios';
import { Message } from 'element-ui';
import tools from './tools';

const global = {}
global.menuStore = new Array();

global.componentSelect = {
    name: ''
}
global.dateColumn = {
    yearvalue: '',
    monthvalue: ''
}
global.remoteUrl = {
    //bussstat
    bussstatList: '/businessStat/list',
    bussstatListByMonth: '/businessStat/listbyMonth',
    //dingsheng
    dingshengCityInsert: '/dingSheng/city/insert',
    dingshengCityList: '/dingSheng/city/list',
    dingshengCityUpdate: '/dingSheng/city/update',
    dingshengCityDelete: '/dingSheng/city/delete',

    dingshengCompanyInsert: '/dingSheng/company/insert',
    dingshengCompanyList: '/dingSheng/company/list',
    dingshengCompanyUpdate: '/dingSheng/company/update',
    dingshengCompanyDelete: '/dingSheng/company/delete',

    dingshengCartypeInsert: '/dingSheng/cartype/insert',
    dingshengCartypeList: '/dingSheng/cartype/list',
    dingshengCartypeUpdate: '/dingSheng/cartype/update',
    dingshengCartypeDelete: '/dingSheng/cartype/delete',

    dingshengInsert: '/dingSheng/insert',
    dingshengList: '/dingSheng/list',
    dingshengDelete: '/dingSheng/delete',
    dingshengUpdate: '/dingSheng/update',
    dingshengListByMonth: '/dingSheng/listbyMonth',
    //kunpeng
    kunpengCityInsert: '/kunPeng/city/insert',
    kunpengCityList: '/kunPeng/city/list',
    kunpengCityUpdate: '/kunPeng/city/update',
    kunpengCityDelete: '/kunPeng/city/delete',

    kunpengCompanyInsert: '/kunPeng/company/insert',
    kunpengCompanyList: '/kunPeng/company/list',
    kunpengCompanyUpdate: '/kunPeng/company/update',
    kunpengCompanyDelete: '/kunPeng/company/delete',

    kunpengCartypeInsert: '/kunPeng/cartype/insert',
    kunpengCartypeList: '/kunPeng/cartype/list',
    kunpengCartypeUpdate: '/kunPeng/cartype/update',
    kunpengCartypeDelete: '/kunPeng/cartype/delete',

    kunpengInsert: '/kunPeng/insert',
    kunpengList: '/kunPeng/list',
    kunpengDelete: '/kunPeng/delete',
    kunpengUpdate: '/kunPeng/update',
    kunpengListByMonth: '/kunPeng/listbyMonth',
    //zhide
    zhideContractInsert: '/zhideContract/insert',
    zhideContractList: '/zhideContract/list',
    zhideContractUpdate: '/zhideContract/update',
    zhideContractDelete: '/zhideContract/delete',
    zhideContractUpload: '/zhideContract/updateData',
    zhideContractExport: '/zhideContract/exportData',
    zhideTid: '',

    //fund efficient
    fundEfficientListByMonth: '/fundEfficient/listbyMonth',
    fundEfficientListByUsageAndMonth: '/fundEfficient/listByUsageMonth',
    fundEfficientInsert: '/fundEfficient/insert',
    fundEfficientDelete: '/fundEfficient/delete',
    fundEfficientUpdate: '/fundEfficient/update',

    fundEfficientCompanyInsert: '/fundEfficient/company/insert',
    fundEfficientCompanyList: '/fundEfficient/company/list',
    fundEfficientCompanyDelete: '/fundEfficient/company/delete',
    fundEfficientCompanyUpdate: '/fundEfficient/company/update',

    fundEfficientFundUsageInsert: '/fundEfficient/fundUsage/insert',
    fundEfficientFundUsageList: '/fundEfficient/fundUsage/list',
    fundEfficientFundUsageDelete: '/fundEfficient/fundUsage/delete',
    fundEfficientFundUsageUpdate: '/fundEfficient/fundUsage/update',
    //
    userPermissionNotRoleBased: '/userPermissionNotRole',
    cookie: '/cookie',
    accessCode: '/getImageCode',
    login: '/login',
    logout: '/logout',
    //user manage
    userMenu: '/userMenu',
    userInfo: '/userInfo',
    userPermission: '/userPermission',
    userList: '/user/list',
    userFind: '/user/find',
    userDelete: '/user/delete',
    userAdd: '/user/save',
    userUpdate: '/user/update',
    userUpdatePWD: '/user/updatePWD',
    distributeRole: '/user/distributeRole',
    //terms manage
    dictionary: '/terms/dictionary',
    termsCodeList: '/terms/code/list',
    termsCodeFind: '/terms/code/find',
    termsCodeSave: '/terms/code/save',
    termsCodeUpdate: '/terms/code/update',
    termsCodeDelete: '/terms/code/delete',
    termsValueList: '/terms/value/list',
    termsValueFind: '/terms/value/find',
    termsValueSave: '/terms/value/save',
    termsValueUpdate: '/terms/value/update',
    termsValueDelete: '/terms/value/delete',
    //role manage
    roleList: '/role/list',
    roleFind: '/role/find',
    roleDelete: '/role/delete',
    roleAdd: '/role/save',
    roleUpdate: '/role/update',
    findAllRole: '/role/findAllRole',
    findRoleByUserId: '/role/findRoleByUserId',

    //resource manage
    findMenuSelectStore: '/resource/findMenuSelectStore',
    resourceFindByParentCode: '/resource/findByParentCode',
    resourceList: '/resource/list',
    resourceFind: '/resource/find',
    resourceDelete: '/resource/delete',
    resourceAdd: '/resource/save',
    resourceUpdate: '/resource/update',
    permissionAdd: '/resource/permission/save',
    permissionUpdate: '/resource/permission/update',
    permissionDelete: '/resource/permission/delete',
    findAllDistributeResource: '/resource/findAllDistributeResource',
    findRoleDistributeResource: '/resource/findRoleDistributeResource',
    distributePermission: '/resource/distributePermission',
}

/**
 * flash dictionary
 */
let loadDictionary = function() {
    apiAxios.get(global.remoteUrl.dictionary, null, response => {
        let dictionary = new Map();
        let termsCodeMap = new Map();
        let termsCodes = new Array();
        let dataArr = response.result.termsCodeDTOS;
        for (let i = 0; i < dataArr.length; i++) {
            dictionary.set(dataArr[i].termsCode, dataArr[i].termsValues);
            termsCodeMap.set(dataArr[i].termsCode, dataArr[i].termsName);
            termsCodes.push({
                termsCode: dataArr[i].termsCode,
                termsName: dataArr[i].termsName
            })
        }
        global.dictionary = dictionary;
        global.termsCodes = termsCodes;
        global.termsCodeMap = termsCodeMap;
        return loadDictionary;
    }, fail => {
        Message.error(fail.message);
    })
}

let loadMenuSelectStore = function() {
    apiAxios.get(global.remoteUrl.findMenuSelectStore, null, response => {
        global.menuStore = response.result;
    }, fail => {
        Message.error(fail.message);
    })
}

let loadRoleStore = function() {
    apiAxios.get(global.remoteUrl.findAllRole, null, response => {
        let roles = response.result;
        let roleStore = [];
        if (tools.isNotEmpty(roles)) {
            roles.forEach((role, index) => {
                roleStore.push({
                    label: role.roleName,
                    code: role.roleCode,
                    key: role.tid,
                });
            });
        }
        global.roleStore = roleStore;
    }, fail => {
        Message.error(fail.message);
    })
}

let loadUserPermission = function() {
    let userName = JSON.parse(sessionStorage.getItem('userInfo')).userName;
    apiAxios.get(global.remoteUrl.userPermission, { userName: userName }, response => {
        let store = {};
        if (tools.isNotEmpty(response.result)) {
            store = response.result;
        }
        global.userPermission = store;
    }, fail => {
        Message.error(fail.message);
    })
};

let loadUserPermissionNotRole = function() {

    const self = this;
    let params = {
        userName: JSON.parse(sessionStorage.getItem('userInfo')).userName,
    };
    apiAxios.get("/userPermissionNotRole", params, response => {
        console.log("get user permission not rolebased")
        if (tools.isNotEmpty(response.result)) {
            let userPermission = response.result;
            global.userPermissionNotRole = userPermission;
            console.log("get user permission:" + userPermission)
        }
    }, fail => {
        Message.error(fail.message);
    })
};
let loadDistributeResourceStore = function() {
    apiAxios.get(global.remoteUrl.findAllDistributeResource, null, response => {
        let store = {};
        if (tools.isNotEmpty(response.result)) {
            store = response.result;
        }
        global.distributeStore = JSON.parse(JSON.stringify(store));
    }, fail => {
        Message.error(fail.message);
    })
};

let loadkunpengCity = function(that) {
    apiAxios.get(global.remoteUrl.kunpengCityList, null, response => {
        let store = {};
        if (tools.isNotEmpty(response.result)) {
            store = response.result;
        }
        global.kunpengCity = JSON.parse(JSON.stringify(store));
        //console.log("kun peng city:" + global.kunpengCity[0].city)
        that.kunpentcitySelectCities = global.kunpengCity

    }, fail => {
        Message.error(fail.message);
    })
    console.log("end of loadkunpengcity, global.kunpengCity:" + global.kunpengCity)
}



export default {
    remote() {
        return global.remoteUrl;
    },
    dateColumn() {
        return global.dateColumn;
    },
    componentSelect() {
        return global.componentSelect;
    },
    autoFlashDictionary: function() {
        setInterval(loadDictionary(), 10 * 60 * 1000);
    },
    flashDictionary: function() {
        loadDictionary();
    },
    flashMenuSelectStore: function() {
        loadMenuSelectStore();
    },
    getTermsCodeMap: function() {
        return global.termsCodeMap;
    },
    getTermsCodeStore: function() {
        return global.termsCodes;
    },
    getTermsValueStore: function(termsCode) {
        if (tools.isEmpty(termsCode)) {
            return [];
        }
        let valueData = global.dictionary.get(termsCode);
        let result = new Array();
        for (let i = 0, len = valueData.length; i < len; i++) {
            let code = valueData[i].valueCode;
            if (tools.isNumber(code)) {
                code = Number(code);
            }
            result.push({
                'valueCode': code,
                'valueName': valueData[i].valueName
            });
        }
        return result;
    },
    getValueNameByTermsCodeAndValueCode(termsCode, valueCode) {
        if (tools.isEmpty(termsCode) || tools.isEmpty(valueCode)) {
            return null;
        }
        let values = this.getTermsValueStore(termsCode);
        for (let i = 0, len = values.length; i < len; i++) {
            if (valueCode == values[i].valueCode) {
                return values[i].valueName;
            }
        }
    },
    transformActive(cell) {
        let value = '';
        if (cell == 'Y') {
            value = '有效';
        } else {
            value = '无效';
        }
        return value;
    },
    getMenuCodeValueStore() {
        return global.menuStore;
    },
    flashRoleStore() {
        loadRoleStore();
    },
    getRoleStore() {
        return global.roleStore;
    },
    flashDistributeStore() {
        loadDistributeResourceStore();
    },
    getDistributeStore() {
        return global.distributeStore;
    },
    flashUserPermission() {
        loadUserPermission();
    },
    flashUserPermissionNotRole() {
        loadUserPermissionNotRole();
    },
    setUserPermissions(userPermissions) {
        global.userPermission = userPermissions;
    },
    setUserPermissionNotRole(p) {
        global.userPermissionNotRole = p;
    },
    haveUserPermissionNotRole: function(path) {
        const self = this;
        /*
                let params = {
                    userName: JSON.parse(sessionStorage.getItem('userInfo')).userName,
                };
        
                apiAxios.get("/userPermissionNotRole", params, response => {
                    console.log("get user permission not rolebased")
                    if (tools.isNotEmpty(response.result)) {
                        let userPermission = response.result;
                        global.userPermissionNotRole = userPermission;
                        console.log("get user permission:" + userPermission)
                        global.tempGranted = false;
                        


                    }
                }, fail => {
                    Message.error(fail.message);
                })*/
        let key = ''
        global.tempGranted = false;
        for (key in global.userPermissionNotRole) {
            if (((String)(global.userPermissionNotRole[key])).indexOf(path) >= 0) {
                console.log("permission granted for path:" + path)
                global.tempGranted = true;

            }

        }

        console.log("path:" + path)
        console.log("user permission is:" + global.userPermissionNotRole)
        console.log("return granted privilledge:" + global.tempGranted);
        return global.tempGranted;
    },
    getUserPermissions() {
        if (tools.isEmpty(global.userPermission)) {
            loadUserPermission();
        }
        return global.userPermission;
    },
    getUserPermissionsNotRole() {
        if (tools.isEmpty(global.userPermissionNotRole)) {
            loadUserPermissionNotRole();
        }
        return global.userPermissionNotRole;
    },

    getKunPengCity(that) {
        if (tools.isEmpty(global.kunpengCity)) {
            loadkunpengCity(that);
        }
        console.log("kunpengCity:" + global.kunpengCity)

    },


}