let API_ROOT='';
if(location.hostname.indexOf('dev-')!=-1
  ||location.hostname.indexOf('test-')!=-1
  ||location.hostname.indexOf('prod-')!=-1){
    API_ROOT=`https://${location.hostname}`;
}else{
  API_ROOT=`http://localhost:3000`
}

export default API_ROOT