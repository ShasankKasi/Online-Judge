const fs=require("fs");
const path=require('path');
const {v4:uuid}=require('uuid');
const dirCodes=path.join(__dirname,'codes');
const dirTestcases=path.join(__dirname,'testcases');

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive:true});
}
if(!fs.existsSync(dirTestcases)){
    fs.mkdirSync(dirTestcases,{recursive:true});
}

const generateFile=async(language,code,input)=>{
    const jobID=uuid();
    const fileName=`${jobID}.${language}`;
    const fileName2=`${jobID}.txt`;
    const filePath=path.join(dirCodes,fileName);
    const filePath2=path.join(dirTestcases,fileName2);
    await fs.writeFileSync(filePath,code);
    await fs.writeFileSync(filePath2,input);
    return {filePath,filePath2};

}
module.exports={generateFile};