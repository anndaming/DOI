export type TypeRoute = {
    path: string,
    component: any,
    meta: { title?: string, icon?: string },
}

try {
    if (typeof require.context === 'undefined') {
        const path = require('path');
        const fs = require('fs');
        // @ts-ignore
        require.context = (base: string = '.', scanSubDirectories: boolean = false, regularExpression: RegExp = /\.tsx$/) => {
            const files: any = {};

            function readDirectory(directory: string) {
                fs.readdirSync(directory).forEach((file: string) => {
                    const fullPath = path.resolve(directory, file);
                    if (fs.statSync(fullPath).isDirectory()) {
                        if (scanSubDirectories) readDirectory(fullPath);
                        return;
                    }
                    if (!regularExpression.test(fullPath)) return;
                    files[fullPath] = true;
                });
            }

            readDirectory(path.resolve(__dirname, base));

            function Module(file: string) {
                return require(file);
            }

            Module.keys = () => Object.keys(files);
            return Module;
        };
    }
} catch (e) {
}


const context = require.context("../pages", true, /index\.tsx$/);
const paths: string[] = context.keys(); // 获取了所有文件的路径
const routes: TypeRoute[] = paths.map((path: string) => {
    // 批量获取引入的组件
    const component: any = context(path).default;
    // 组件扩展属性方便渲染菜单
    const meta = component['meta'] || {};
    // 生成预期中的路由Path：如/WorksDOI
    path = path.substr(1).replace(/(\/index\.tsx)$/, "");
    return {path, component, meta};
});

export default routes;
