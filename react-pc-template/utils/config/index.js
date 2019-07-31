let API_ROOT='';
if(location.hostname.indexOf('dev-')!=-1
  ||location.hostname.indexOf('test-')!=-1
  ||location.hostname.indexOf('prod-')!=-1){
    API_ROOT=`https://${location.hostname}`;
}else{
  API_ROOT=`${location.origin}`
}

export default API_ROOT