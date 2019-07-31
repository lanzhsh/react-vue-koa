let TenBUCKET,TenUrl;

if(location.hostname.indexOf('dev-')!=-1
  ||location.hostname.indexOf('test-')!=-1){
  TenBUCKET='resource-125578';//配置腾讯云的Bucket
  TenUrl='https://resource.com';//配置腾讯云的路径
}else if(location.hostname=== "prod.com"){
  TenBUCKET='prod-1255821078';
  TenUrl='https://cos.com';
}else{
  TenBUCKET='resource-125578';
  TenUrl='https://resource.com';
}

export{
  TenBUCKET,TenUrl
}