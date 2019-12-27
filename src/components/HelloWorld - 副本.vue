<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import {JSEncrypt} from 'jsencrypt';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created(){
    /**
     * 加密
     * @param {String} 待加密的密码
     * */
    // const PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB'
    const PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCMB58nchwmzkq/kcp37Dt25vv0evMBmDnyYb5CFuDbaGapiFeALRwPvcTV6b2SERYcukwK1NBUrd5J0Ln7h9AMhsDrZrV/PepSfD+a637oRyMAHhutFvSBB+SniPuDqgYy1uV789dIH83rNJKvNepc/LrqZg412t9tixszlEEvUQIDAQAB'
    function encrypt(data) {
      let encryptor = new JSEncrypt();  // 新建JSEncrypt对象
      encryptor.setPublicKey(PUBLIC_KEY); // 设置公钥
      const rsaDta = encryptor.encrypt(data); // 进行加密
      return rsaDta
    }

    /**
     * 解密
     * @param {String} 待解密的密码
     * */
    // const PRIVATE_KEY = 'MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQABAoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fvxTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeHm7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAFz/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIMV7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATeaTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5AzilpsLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Ozuku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876'
    const PRIVATE_KEY = "MIICXAIBAAKBgQCMB58nchwmzkq/kcp37Dt25vv0evMBmDnyYb5CFuDbaGapiFeALRwPvcTV6b2SERYcukwK1NBUrd5J0Ln7h9AMhsDrZrV/PepSfD+a637oRyMAHhutFvSBB+SniPuDqgYy1uV789dIH83rNJKvNepc/LrqZg412t9tixszlEEvUQIDAQABAoGAYgZ73as+FdRX819l8ymGPyhXvL/NGZKtDgZqn+1QH4goRgnR50Ks4EAiaPUl5fjcF+Q6k2KDLKRCdj4N1A0xEGm0Bz15fIhHHPteO93ki6O6vCiF7J+5Rt0n3m0SZNQFAee0SWjUO5B/cyccgKwR7SD2P//3UCxEIUMBhEVj2xkCQQDOnw1oI/Yez+wJ9rDvbZFzUtWKXYn6yBvxgtmokxUM4k9IOsLdZt2q0vZyLLzXBrtCaeEohHZvLaFYPI1rsaynAkEArX6LxSKJtACUepeea1pwo5arosk2cPIRuxEKl9RlEddxbkpiJQ+OQ/LYPgrK9h2OietAUF5vU9UqmzNV3jvrRwJAPySkODslL+1iuPjGwaS+Wnvp/krvq9ATmg7e7YFlYXaXu/8ZJggVneqyndnGLABGodkxkexJNVjAgfKfVVYK6QJABoaI+Uw4Q7X137qOMdl//Rcws3m/+3WPZyrX7CgH+SjSUmSn1l8EadfbfFHpmmI4N0XK8Hrs0wlkhdvjce1tBwJBAKJ/vkTNjiOTNP7YXnzjef50udG7v2D+fDbDbzhsROnUm3tfbLcfThmkToESQlxC8iOjcy2IYrXyBF97bwq61Vw=";
    function decrypt(rsaDta) {
        let decryptor = new JSEncrypt();  // 新建JSEncrypt对象
        decryptor.setPrivateKey(PRIVATE_KEY); // 设置私钥setPublicKey(PUBLIC_KEY)
        const data = decryptor.decrypt(rsaDta); // 进行解密
        return data
    }
    let str = "123";
    console.log("原始："+str);
    let base = encrypt(str);
    console.log("加密后："+base);
    // Dv378vpmttMl2HyEllU7r3X3ER8Umitp9HtU5HnukPLGqHUYy5YlG0yL+AxQ6Vz2N+uLKGmO1wgIQUTl+nURd1uXvivEmcqrFK4Didpa1/pazw3mrE1mg2pKPXHsdzvQgRVdyeC5KBRu7Qr+5adN7y7ZRq/4b9lG4YeJZylqADg=
    console.log("解密返回："+decrypt(base));

    console.time("a");
    var NodeRSA = require("node-rsa");
    const key = new NodeRSA({ b: 1024 }); //生成2048位的密钥
    let publicDer = key.exportKey("pkcs1-public-pem");  //公钥
    let privateDer = key.exportKey("pkcs1-private-pem");//私钥
    console.timeEnd("a");
    //由于我们公司需要提交的公钥不需要有头部尾部换行，简单来说就是只要一个字符串           
    publicDer = publicDer.replace(/\n/g,'');
    publicDer = publicDer.replace('-----BEGIN RSA PUBLIC KEY-----','');
    publicDer = publicDer.replace('-----END RSA PUBLIC KEY-----','');
    //接接上面的代码哈 先导入私钥
    key.importKey(privateDer ,"pkcs1-private-pem");
    // hash是一个待签署的哈希值，是个base64的
    let signedHash = key.sign("aGFzaA==","base64","base64"); //私钥签名后的结果是个base64格式的哦
    console.log(signedHash);
    function insert_str(str, insert_str, sn) {
    var newstr = "";
    for (var i = 0; i < str.length; i += sn) {
        var tmp = str.substring(i, i + sn);
        newstr += tmp + insert_str;
    }
    return newstr;
}
var getPublicKey = function(key){
    var result = insert_str(key, '\n', 64);
    return '-----BEGIN PUBLIC KEY-----\n' + result + '-----END PUBLIC KEY-----';
};
var getPrivateKey = function(key){
    var result = insert_str(key, '\n', 64);
    return '-----BEGIN PRIVATE KEY-----\n' + result + '-----END PRIVATE KEY-----';
};

    var pubKey = new NodeRSA(getPublicKey(PUBLIC_KEY));
    console.log(1)
    var encrypted = pubKey.encrypt("MTIz", 'base64');
    console.log(encrypted)
    // base
    console.log(getPrivateKey(PRIVATE_KEY))
    var priKey = new NodeRSA(getPrivateKey(PRIVATE_KEY), 'pkcs8-private-pem', {encryptionScheme: 'pkcs1'});
    console.log(base)
    var decrypted = priKey.decrypt(encrypted, 'utf8');
    console.log(decrypted)

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
