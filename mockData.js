import Mock from 'mockjs'
const Random = Mock.Random;

Mock.mock(`/api/disability/charts/`, {
    "ret": 0,
    "data":
        {
            "mtime|10": ["@date"],//随机生成日期时间
            "score|10": ["@natural(20, 100)"],//随机生成1-100的数字
        }
});

//报告-预算-调整API
function budgetAdjustAPI() {
    let itemsNum = Random.natural(1, 5);
    let dataList=[];
    for(let i = 0; i < itemsNum; i ++) {
        dataList.push(
            {
                "id|+1": 1,   //id，自增1
                "year": Random.date('yyyy'),//随机生成日期时间
                "objName": Random.name(),//生成商品信息，长度为10个汉字
                "env": "env",//随机生成1-100的数字
                "dbType": "dataBase",//随机生成1-100的数字
                "number": (Random.natural(1, 1000)).toFixed(2),//随机生成1-100的数字
                "price": (Random.natural(20, 100)).toFixed(2),//随机生成1-100的数字
                "budget": (Random.natural(0, 10000)).toFixed(2),//随机生成1-100的数字
                "status|1": ['调整中', ''],//调整中或者空
                "time": Random.datetime(),//随机生成日期
            }
        )
    }
    Mock.mock(`/api/report/budgetAdjust/`, 'post', dataList);
}
function budgetAdjustSubAPI() {
    let dataList=[];
    for(let i = 0; i < 2; i ++) {
        dataList.push(
            {
                "id|+1": 1,   //id，自增1
                "objName": Random.name(),//生成商品信息，长度为10个汉字
                "actualSize": (Random.float(0,100,0,2)).toFixed(2),//随机生成1-100的数字
                "thisYearEnd": (Random.float(0,100,0,2)).toFixed(2),//随机生成1-100的数字
                "nextYearEnd": (Random.float(0,100,0,2)).toFixed(2),//随机生成1-100的数字
                "nextYearHalf": (Random.float(0,100,0,2)).toFixed(2),//随机生成1-100的数字
            }
        )
    }
    Mock.mock(`/api/report/budgetAdjustSub/`, 'post', dataList);
}
budgetAdjustAPI();
budgetAdjustSubAPI();