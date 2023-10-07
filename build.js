const path = require('path');
const alias = require('esbuild-plugin-alias');

// 检查命令行参数是否提供
if (process.argv.length < 3) {
    console.error("请提供要转换的文件路径");
    process.exit(1);
}

const entry = path.resolve(process.argv[2]); // 使用第一个命令行参数作为入口文件

require('esbuild').build({
    entryPoints: [entry],
    bundle: true,
    platform: 'neutral',
    external: ['path', 'fs'],
    outfile: path.resolve(path.dirname(entry), 'output.js'), // 输出到同一目录，命名为output.js
    plugins: [
      alias({
        'lvgljs-ui': path.resolve(__dirname, './src/render/react/index.js'),
      }),
    ],
}).catch(() => process.exit(1))
