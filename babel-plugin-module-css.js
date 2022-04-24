const postcss = require('postcss');
const postcssModules = require('postcss-modules');
const path = require('path');
const fs = require('fs/promises');

let jsonMapping;
let componentName;

const cssModuleProcessor = postcss([postcssModules({
    getJSON(){
        jsonMapping = arguments[1];
    },
    generateScopedName(className,string/* '<input css yfFs5i>' */){
        const id = string.split(' ')[2].replace('>','')
        return `${componentName}__${className}__${id}`
    },
})]);

module.exports = function(babel,options,pwd){
    return {
        visitor: {
            ImportDeclaration: function(astpath){
                const importSource = astpath.node.source.value;
                if(importSource.match(/.css$/)){
                    const {base,ext,name,dir} = path.parse(importSource);
                    const newName = base+'.js';
                    astpath.node.source.value = importSource.replace(base,newName); // замена в имени импорта
                    // console.log(importSource)

                    componentName = path.parse(this.file.opts.filename).name

                    const currentDirectory = path.dirname(this.file.opts.filename)
                    const destinationDerictory = currentDirectory.replace(this.file.opts.cwd+'/src',this.file.opts.cwd+'/build');

                    const cssFilePath = path.resolve(currentDirectory,importSource)

                    fs.readFile(cssFilePath)
                        .then(buffer=>buffer.toString())
                        .then(css=>cssModuleProcessor.process(css))
                        .then(result=>{
                            fs.writeFile(destinationDerictory+`/${newName}`,`module.exports=${JSON.stringify({...jsonMapping,'<style>':result.css})}`)
                        })
                    
                }   

            }
        }
    }
}