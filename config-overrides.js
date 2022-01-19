const { override, addLessLoader, fixBabelImports } = require("customize-cra");
module.exports = override(

    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: 'es',
        style: "css",
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: { '@primary-color': '#1DA57A' },
        },
        sourceMap: true,
    }),
);
