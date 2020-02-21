import Mock from 'mockjs'

const Random = Mock.Random;

Mock.mock(`/api/disability/charts/`, {
    "ret": 0,
    "data": {
        "mtime|10": ["@date"], //随机生成日期时间
        "score|10": ["@natural(20, 100)"], //随机生成1-100的数字
    }
});

//服务
//性能监控
function abilityWatch() {
    let dataList = {
        oracle: {},
        mssql: {},
        nas: {},
    };
    dataList.oracle = {
        "id|+1": 1, //id，自增1
        "oracle": Random.natural(100, 200),
        "backup_strategy": Random.natural(100, 400),
        "success": Random.natural(200, 400),
        "running": Random.natural(0, 100),
    };
    dataList.mssql = {
        "id|+1": 1, //id，自增1
        "mssql": Random.natural(100, 200),
        "backup_strategy": Random.natural(100, 400),
        "success": Random.natural(300, 500),
        "running": Random.natural(0, 100),
    };
    dataList.nas = {
        "id|+1": 1, //id，自增1
        "oracle": Random.natural(100, 200),
        "backup_strategy": Random.natural(100, 400),
        "success": Random.natural(100, 400),
        "failed": Random.natural(0, 100),
    };

    Mock.mock(`/api/service/abilityWatch`, 'get', dataList);
}
//性能对比
function abilityCompare() {
    let dataList = {
        chart1: {},
        chart2: {},
        chart3: {},
        chart4: {},
    };
    dataList.chart1 = {
        "id|+1": 1, //id，自增1
        "data|7": ["@natural(100, 1000)"],
    };
    dataList.chart2 = {
        "id|+1": 1, //id，自增1
        "data|7": ["@natural(100, 1000)"],
    };
    dataList.chart3 = {
        "id|+1": 1, //id，自增1
        "data|7": ["@natural(100, 1000)"],
    };
    dataList.chart4 = {
        "id|+1": 1, //id，自增1
        "data1|7": ["@natural(100, 1000)"],
        "data2|7": ["@natural(100, 1000)"],
        "data3|7": ["@natural(100, 1000)"],
        "data4|7": ["@natural(100, 1000)"],
    };

    Mock.mock(`/api/service/abilityCompare`, 'get', dataList);
}
abilityWatch();
abilityCompare();

//报告-预算-调整API
function budgetAdjustDBNameAPI() {
    let itemsNum = Random.natural(300, 400);
    let dataList = [];
    for (let i = 0; i < itemsNum; i++) {
        dataList.push({
            "id|+1": 1, //id，自增1
            "value": Random.name() + " :DB",
            "desc": Random.name(),
        })
    }
    Mock.mock(`/api/report/budgetAdjust/dbname`, 'get', dataList);
}

function budgetAdjustSUBNameAPI() {
    let itemsNum = Random.natural(300, 400);
    let dataList = [];
    for (let i = 0; i < itemsNum; i++) {
        dataList.push({
            "id|+1": 1, //id，自增1
            "value": Random.name() + " :SUB",
            "desc": Random.name(),
        })
    }
    Mock.mock(`/api/report/budgetAdjust/subname`, 'get', dataList);
}

function budgetAdjustAPI() {
    let itemsNum = Random.natural(1, 5);
    let dataList = [];
    for (let i = 0; i < itemsNum; i++) {
        dataList.push({
            "id|+1": 1, //id，自增1
            "year": Random.date('yyyy'), //随机生成日期时间
            "objName": Random.name(), //生成商品信息，长度为10个汉字
            "env": "env", //随机生成1-100的数字
            "dbType": "dataBase", //随机生成1-100的数字
            "number": Random.natural(1, 1000), //随机生成1-100的数字
            "price": Random.natural(20, 100), //随机生成1-100的数字
            "budget": Random.natural(0, 10000), //随机生成1-100的数字
            "status|1": ['调整中', ''], //调整中或者空
            "time": Random.datetime(), //随机生成日期
        })
    }
    Mock.mock(`/api/report/budgetAdjust/`, 'post', dataList);
}

function budgetAdjustSubAPI() {
    let dataList = [];
    for (let i = 0; i < 2; i++) {
        dataList.push({
            "id|+1": 1, //id，自增1
            "objName": Random.name(), //生成商品信息，长度为10个汉字
            "actualSize": Random.float(0, 100, 0, 2), //随机生成1-100的数字
            "thisYearEnd": Random.float(0, 100, 0, 2), //随机生成1-100的数字
            "nextYearEnd": Random.float(0, 100, 0, 2), //随机生成1-100的数字
            "nextYearHalf": Random.float(0, 100, 0, 2), //随机生成1-100的数字
        })
    }
    Mock.mock(`/api/report/budgetAdjustSub/`, 'post', dataList);
}

budgetAdjustAPI();
budgetAdjustSubAPI();
budgetAdjustDBNameAPI();
budgetAdjustSUBNameAPI();
