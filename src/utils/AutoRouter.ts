export type TypeRoute = {
    id: string,
    parentId?: string,
    path: string,
    component: any,
    meta: { title?: string, icon?: string },
    children?: TypeRoute[],
}

const context = require.context("../pages", true, /index\.tsx$/);
const paths: string[] = context.keys(); // 获取了所有文件的路径
const routes: TypeRoute[] = paths.map(path => {
    // 批量获取引入的组件
    const component: any = context(path).default;
    // 组件扩展属性方便渲染菜单
    const meta = component['meta'] || {};
    // 生成预期中的路由Path：如/WorksDOI
    path = path.substr(1).replace(/(\/index\.tsx)$/, "");
    // 处理数据 将每条数据的id和parentId处理好
    const comparePaths = path.substr(1).split("/");
    let id: string;
    let parentId: string | undefined = undefined;
    if (comparePaths.length === 1) {
        // 说明是根节点，根节点不需要添加parent_id
        id = comparePaths.join("/");
    } else {
        // 说明具有父节点
        // 先处理自己的id
        id = comparePaths.join("/");
        // comparePaths除去最后一项就是parent_id
        comparePaths.pop();
        parentId = comparePaths.join("/");
    }
    return {id, parentId, path, component, meta};
});

// 将扁平化的路由数据，转化成符合路由规则的结构
function convertTree(routes: TypeRoute[]): TypeRoute[] {
    let treeArr: TypeRoute[] = [];
    // 所有的数据都已经找到了父节点的id,下面才是真正的找父节点了
    routes.forEach(route => {
        // 判断当前的route有没有parent_id
        if (route.parentId) {
            // 有父节点
            // id===parent_id的那个route就是当前route的父节点
            const target: TypeRoute | undefined = routes.find(v => v.id === route.parentId);
            if (!target) return;
            //判断父节点有没有children这个属性
            if (!target.children) {
                target.children = [];
            }
            target.children.push(route);
        } else {
            treeArr.push(route);
        }
    })

    return treeArr;
}

export default convertTree(routes)
