//	HYPE.documents["inscript"]

(function(){(function m(){function k(a,b,c,d){var e=!1;null==window[a]&&(null==window[b]?(window[b]=[],window[b].push(m),a=document.getElementsByTagName("head")[0],b=document.createElement("script"),e=l,false==!0&&(e=""),b.type="text/javascript",""!=d&&(b.integrity=d,b.setAttribute("crossorigin","anonymous")),b.src=e+"/"+c,a.appendChild(b)):window[b].push(m),e=!0);return e}var l="inscript.hyperesources",f="inscript",g="inscript_hype_container";if(false==
!1)try{for(var c=document.getElementsByTagName("script"),a=0;a<c.length;a++){var d=c[a].src,b=null!=d?d.indexOf("/inscript_hype_generated_script.js"):-1;if(-1!=b){l=d.substr(0,b);break}}}catch(p){}c=null==navigator.userAgentData&&navigator.userAgent.match(/MSIE (\d+\.\d+)/);c=parseFloat(c&&c[1])||null;d=!0==(null!=window.HYPE_754F||null!=window.HYPE_dtl_754F)||false==!0||null!=c&&10>c;a=!0==d?"HYPE-754.full.min.js":"HYPE-754.thin.min.js";c=!0==d?"F":"T";
d=d?"":"";if(false==!1&&(a=k("HYPE_754"+c,"HYPE_dtl_754"+c,a,d),false==!0&&(a=a||k("HYPE_w_754","HYPE_wdtl_754","HYPE-754.waypoints.min.js","")),false==!0&&(a=a||k("Matter","HYPE_pdtl_754","HYPE-754.physics.min.js","")),a))return;d=window.HYPE.documents;if(null!=d[f]){b=1;a=f;do f=""+a+"-"+b++;while(null!=d[f]);for(var e=
document.getElementsByTagName("div"),b=!1,a=0;a<e.length;a++)if(e[a].id==g&&null==e[a].getAttribute("HYP_dn")){var b=1,h=g;do g=""+h+"-"+b++;while(null!=document.getElementById(g));e[a].id=g;b=!0;break}if(!1==b)return}b=[];b=[{name:"initGem",source:"function(hypeDocument, element, event) {  // * basic setup\n  hypeDocument.customData.Decimal = 6;\n  hypeDocument.customData.isLoading = false;\n  hypeDocument.customData.isQuerying = false;\n  hypeDocument.customData.isQueryResult = false;\n  hypeDocument.customData.queryResult = \"\";\n  hypeDocument.customData.server = \"https://api.xrpscript.com\";\n  // hypeDocument.customData.server = \"http://localhost\";\n  hypeDocument.customData.balance = \"\ud83d\udcb0\";\n  hypeDocument.customData.accountFull = undefined;\n  hypeDocument.customData.txResult = { op: {} };\n\n  // * fetch basic info\n  function fetchInfo() {\n    fetch(`${hypeDocument.customData.server}/info`).then((res) => {\n      res.json().then((data) => {\n        console.log(\"info\", data);\n        hypeDocument.customData.syncedLedger = data.result.syncedLedger;\n        // * only zero mint last period, set lastBestGpa to \"1\", because minimum gpa to get 100 is 1\n        hypeDocument.customData.lastBestGpa = data.result.lastBestGpa;\n        if (data.result.lastBestGpa === \"0\") {\n          hypeDocument.customData.lastBestGpa = \"1\";\n        }\n        hypeDocument.customData.totalSupply = parseInt(\n          BigInt(data.result.totalSupply) /\n          10n ** BigInt(hypeDocument.customData.Decimal),\n        );\n        var [gpaDeflatedX100, minRatioDeflated] =\n          data.result.deflate.split(\"|\");\n        hypeDocument.customData.freeMintRate = `${(\n          10 / parseFloat(minRatioDeflated)\n        ).toFixed(6)}%`;\n        hypeDocument.customData.gapMaxRate = `${parseFloat(\n          gpaDeflatedX100,\n        ).toFixed(6)}%`;\n        hypeDocument.goToTimeInTimelineNamed(0, \"Main Timeline\");\n        hypeDocument.continueTimelineNamed(\"Main Timeline\");\n        // * buffering process\n        var bufferingProcess = hypeDocument.getElementById(\"bufferingProcess\");\n        hypeDocument.setElementProperty(\n          bufferingProcess,\n          \"width\",\n          (140 *\n            parseInt(\n              hypeDocument.customData.syncedLedger.toString().slice(-2),\n            )) /\n          100,\n          1,\n        );\n      });\n      if (!!hypeDocument.customData.accountFull) {\n        fetch(\n          `${hypeDocument.customData.server}/balance/${hypeDocument.customData.accountFull}`,\n        ).then((res) => {\n          res.json().then((data) => {\n            const newBalance =\n              \"\ud83d\udcb0 \" +\n              (\n                parseInt(data.result.balance) /\n                10 ** hypeDocument.customData.Decimal\n              ).toString();\n            if (newBalance && hypeDocument.customData.balance !== newBalance) {\n              hypeDocument.customData.balance = newBalance;\n              hypeDocument.goToTimeInTimelineNamed(0, \"Balance\");\n              hypeDocument.continueTimelineNamed(\"Balance\");\n            }\n          });\n        });\n      }\n    });\n  }\n\n  if (!!window.localStorage.getItem(\"account\")) {\n    console.log('Account:', window.localStorage.getItem(\"account\"));\n    hypeDocument.customData.accountFull = window.localStorage.getItem(\"account\");\n    hypeDocument.customData.account = `${window.localStorage.getItem(\"account\").slice(\n      0,\n      6,\n    )}...${window.localStorage.getItem(\"account\").slice(-6)}`;\n  }\n  fetchInfo();\n  setInterval(() => fetchInfo(), 17_000);\n\n  hypeDocument.goToTimeInTimelineNamed(0, \"SentAnimation\");\n  function playSentAnimation() {\n    hypeDocument.goToTimeInTimelineNamed(0, \"SentAnimation\");\n    hypeDocument.continueTimelineNamed(\"SentAnimation\");\n    hypeDocument.customData.isLoading = false;\n  }\n\n  function soloCycle() {\n    soloOnLoad().then(({ isTx, isAccount }) => {\n      if (isAccount) {\n        console.log('Account:', window.localStorage.getItem(\"account\"));\n        hypeDocument.customData.accountFull = window.localStorage.getItem(\"account\");\n        hypeDocument.customData.account = `${window.localStorage.getItem(\"account\").slice(\n          0,\n          6,\n        )}...${window.localStorage.getItem(\"account\").slice(-6)}`;\n        hypeDocument.customData.isLoading = false;\n        fetchInfo();\n      }\n      if (!!isTx) playSentAnimation();\n    });\n  }\n\n  soloCycle();\n  setInterval(() => soloCycle(), 3_000);\n\n\n  GemWalletApi.on(\"logout\", (response) => {\n    hypeDocument.customData.account = undefined;\n    hypeDocument.customData.isLoading = false;\n    hypeDocument.customData.isQuerying = false;\n    hypeDocument.customData.isQueryResult = false;\n    hypeDocument.customData.queryResult = \"\";\n    hypeDocument.customData.balance = \"\ud83d\udcb0\";\n    hypeDocument.customData.accountFull = undefined;\n    hypeDocument.customData.txResult = { op: {} };\n  });\n}",identifier:"21"},{name:"connect",source:"function(hypeDocument, element, event) {  hypeDocument.customData.isLoading = true;\n  if (isMobileBrowser()) {\n    soloSignIn();\n  } else {\n    GemWalletApi.isInstalled().then((isInstalled) => {\n      if (isInstalled) {\n        GemWalletApi.getAddress().then((result) => {\n          var account = result.result.address;\n          window.localStorage.setItem(\"account\", account);\n          hypeDocument.customData.accountFull = account;\n          hypeDocument.customData.isLoading = false;\n          hypeDocument.customData.account = `${account.slice(\n            0,\n            6,\n          )}...${account.slice(-6)}`;\n          fetch(`${hypeDocument.customData.server}/balance/${account}`).then(\n            (res) => {\n              res.json().then((data) => {\n                hypeDocument.customData.balance =\n                  \"\ud83d\udcb0 \" +\n                  (\n                    parseInt(data.result.balance) /\n                    10 ** hypeDocument.customData.Decimal\n                  ).toString();\n              });\n            },\n          );\n        });\n      }\n    });\n  }\n}",identifier:"22"},{name:"disconnect",source:"function(hypeDocument, element, event) {  hypeDocument.customData.isLoading = true;\n  window.localStorage.removeItem(\"account\");\n  hypeDocument.customData.account = undefined;\n  hypeDocument.customData.isQuerying = false;\n  hypeDocument.customData.isQueryResult = false;\n  hypeDocument.customData.queryResult = \"\";\n  hypeDocument.customData.balance = \"\ud83d\udcb0\";\n  hypeDocument.customData.accountFull = undefined;\n  hypeDocument.customData.txResult = { op: {} };\n  hypeDocument.customData.isLoading = false;\n}",identifier:"24"},{name:"sendPayload",source:"function(hypeDocument, element, event) {  hypeDocument.customData.isLoading = true;\n  if (!hypeDocument.customData.account) {\n    hypeDocument.customData.isLoading = false;\n    return (hypeDocument.customData.walletError = true);\n  }\n  hypeDocument.customData.walletError = false;\n  var memoData = document.getElementById(\"memoData\").innerText;\n  var payment = BigInt(\"1\");\n  try {\n    var memoJSON = JSON.parse(memoData);\n    console.log(memoJSON);\n    if (!!memoJSON.gpa) var gpa = BigInt(memoJSON.gpa);\n    if (!!memoJSON.amount) var amount = BigInt(memoJSON.amount);\n    if (!!gpa && !!amount) payment = (amount * gpa) / 10n ** 2n;\n    if (payment <= 0n) payment = 1n;\n  } catch (error) {\n    console.error(\"error\", error);\n    hypeDocument.customData.memoData = memoData;\n    hypeDocument.customData.isLoading = false;\n    return (hypeDocument.customData.JSONError = true);\n  }\n  console.log(\"memoData\", memoData);\n  hypeDocument.customData.JSONError = false;\n  var transaction = {\n    TransactionType: \"Payment\",\n    Destination: \"rxRpSNb1VktvzBz8JF2oJC6qaww6RZ7Lw\",\n    Memos: [\n      {\n        Memo: {\n          MemoData: stringToHex(memoData).replace(\"0x\", \"\"),\n        },\n      },\n    ],\n    Amount: payment.toString(),\n  };\n  if (isMobileBrowser()) {\n    soloSignPayload(transaction);\n  } else {\n    GemWalletApi.submitTransaction({ transaction })\n      .then((response) => {\n        console.log(response.result?.hash);\n        hypeDocument.customData.isLoading = false;\n      })\n      .catch((error) => {\n        console.error(\"Transaction submission failed\", error);\n      });\n  }\n}",identifier:"27"},{name:"query",source:"function(hypeDocument, element, event) {  hypeDocument.customData.isQuerying = true;\n  var txHash = document.getElementById(\"txHash\").innerText;\n  fetch(`${hypeDocument.customData.server}/tx/${txHash}`).then((res) => {\n    res.json().then((data) => {\n      hypeDocument.customData.isQuerying = false;\n      console.log(\"tx\", data);\n      if (res.ok && data.result) {\n        hypeDocument.customData.txResult = data.result.transaction;\n        hypeDocument.customData.isQueryResult = true;\n        hypeDocument.customData.queryResult =\n          `<pre style=\"overflow: scroll; display: inline-block; width: 100%; height: 100%;\">` +\n          JSON.stringify(hypeDocument.customData.txResult.op, null, 2) +\n          \"</pre>\";\n      } else {\n        hypeDocument.customData.isQueryResult = true;\n        hypeDocument.customData.queryResult = data.error;\n        hypeDocument.customData.txResult = { op: {} };\n      }\n    });\n  });\n}",identifier:"113"},{name:"selectText",source:"function(hypeDocument, element, event) {  var selection = window.getSelection();\n  var range = document.createRange();\n  range.selectNodeContents(element);\n  selection.removeAllRanges();\n  selection.addRange(range);\n}",identifier:"137"}];e={};h={};for(a=0;a<b.length;a++)try{h[b[a].identifier]=b[a].name,e[b[a].name]=eval("(function(){return "+b[a].source+"})();")}catch(n){window.console&&window.console.log(n),e[b[a].name]=function(){}}c=new window["HYPE_754"+c](f,g,{"7":{p:1,n:"github-mark-white.png",g:"278",o:true,t:"@1x"},"3":{p:1,n:"xrps-logo.svg",g:"124",t:"image/svg+xml"},"8":{p:1,n:"github-mark-white_2x.png",g:"278",o:true,t:"@2x"},"4":{n:"gemwallet-api.js"},"0":{n:"HypeReactiveContent.prod.min.js"},"9":{n:"xrpl-latest-min.js"},"5":{p:1,n:"logo-white.png",g:"276",o:true,t:"@1x"},"1":{n:"stringToHex.js"},"6":{p:1,n:"logo-white_2x.png",g:"276",o:true,t:"@2x"},"2":{p:1,n:"loading.gif",g:"31",t:"@1x"},"10":{n:"solo.js"}},
l,["<link href='https://fonts.googleapis.com/css?family=Linefont&subset=latin' rel='stylesheet' type='text/css'>","<link href='https://fonts.googleapis.com/css?family=Roboto&subset=latin' rel='stylesheet' type='text/css'>"],e,[{n:"inscript",o:"1",X:[0]}],[{o:"3",A:{a:[{p:4,h:"21"}]},p:"600px",cA:false,a:100,Z:1400,Y:375,c:"#121A21",L:[],bY:1,d:375,U:{},T:{"128":{q:false,z:0.2,i:"128",n:"Balance",a:[{f:"c",y:0,z:0.1,i:"cR",e:1.15,s:1,o:"333"},{f:"c",y:0,z:0.1,i:"cQ",e:1.15,s:1,o:"333"},{f:"c",y:0.1,z:0.1,i:"cR",e:1,s:1.15,o:"333"},{f:"c",y:0.1,z:0.1,i:"cQ",e:1,s:1.15,o:"333"},{y:0.2,i:"cR",s:1,z:0,o:"333",f:"c"},{y:0.2,i:"cQ",s:1,z:0,o:"333",f:"c"}],f:30,b:[]},"283":{q:false,z:3,i:"283",n:"SentAnimation",a:[{f:"c",y:0,z:0.1,i:"e",e:1.12921451,s:0,o:"321"},{f:"c",y:0,z:0.1,i:"cR",e:1.1,s:1,o:"321"},{f:"c",y:0,z:0.1,i:"cQ",e:1.1,s:1,o:"321"},{f:"c",y:0.1,z:0.2,i:"e",e:1,s:1.12921451,o:"321"},{f:"c",y:0.1,z:0.2,i:"cR",e:1,s:1.1,o:"321"},{f:"c",y:0.1,z:0.2,i:"cQ",e:1,s:1.1,o:"321"},{y:1,i:"cR",s:1,z:0,o:"321",f:"c"},{y:1,i:"cQ",s:1,z:0,o:"321",f:"c"},{f:"c",y:1,z:2,i:"e",e:0,s:1,o:"321"},{y:3,i:"e",s:0,z:0,o:"321",f:"f"}],f:30,b:[]},kTimelineDefaultIdentifier:{q:false,z:17,i:"kTimelineDefaultIdentifier",n:"Main Timeline",a:[{f:"c",y:0,z:17,i:"d",e:0,s:142,o:"339"},{y:17,i:"d",s:0,z:0,o:"339",f:"c"}],f:30,b:[]}},bZ:180,O:["304","347","346","348","289","345","337","334","330","343","339","335","338","341","332","349","331","342","344","333","340","310","306","305","315","312","319","316","313","308","311","314","309","317","318","307","327","326","320","321","328","329","325","324","323","322","336","290","300","301","302","299","293","291","294","292","298","297","296","295","303"],n:"mobile","_":0,v:{"337":{x:"visible",bF:"289",k:"div",c:91,d:152,z:16,a:21,bS:37,j:"absolute",b:19},"302":{h:"31",p:"no-repeat",x:"visible",a:165,q:"100% 100%",b:8,j:"absolute",r:"none",z:12,bS:37,bF:"290",d:39,dY:[["data-visibility","!!isQuerying"]],dB:"img",k:"div",c:41},"344":{aU:8,G:"#ECECEC",c:75,aV:8,r:"inline",d:13,s:"Roboto",t:16,Z:"break-word",w:"-<br>",dY:[["data-content","totalSupply"]],j:"absolute",x:"visible",bF:"337",k:"div",y:"preserve",z:8,aS:8,aT:8,a:0,F:"center",b:99},"338":{aU:8,G:"#ECECEC",c:75,aV:8,r:"inline",d:13,s:"Roboto",t:11,Z:"break-word",w:"<span style=\"color: rgb(236, 236, 236);\">Synced Index</span>",bF:"337",j:"absolute",x:"visible",k:"div",y:"preserve",z:4,aS:8,aT:8,a:0,b:36},"310":{aU:8,G:"#ECECEC",c:171,bS:36,aV:8,r:"inline",d:13,s:"Helvetica,Arial,Sans-Serif",t:11,Z:"break-word",w:"Mint Cycle Buffering<br>",bF:"306",j:"absolute",x:"visible",k:"div",y:"preserve",z:3,aS:8,aT:8,a:0,F:"center",b:0},"303":{aV:8,w:"<span style=\"color: rgb(236, 236, 236);\">address: rxRpSNb1VktvzBz8JF2oJC6qaww6RZ7Lw</span>",x:"visible",a:-3,Z:"break-word",y:"preserve",j:"absolute",bF:"289",r:"inline",yy:"nowrap",s:"Roboto",b:1343,z:23,t:16,aS:8,aT:8,aU:8,G:"#FDFDFD",k:"div"},"345":{b:-1,z:1,K:"Solid",c:87,L:"Solid",d:153,aS:0,M:2,e:1,N:2,aT:0,bS:37,O:2,g:"rgba(240, 239, 255, 0.100)",aU:0,P:2,bF:"337",aV:0,j:"absolute",k:"div",aI:25,aJ:25,aK:25,aL:25,A:"#ECECEC",B:"#ECECEC",C:"#ECECEC",s:"Roboto",D:"#ECECEC",t:48,dY:[],G:"#5D64A4",w:"<br>",x:"visible",I:"Solid",a:0,J:"Solid"},"290":{x:"visible",bF:"289",k:"div",c:375,d:414,z:17,a:-1,bS:37,j:"absolute",b:882},"304":{h:"124",p:"no-repeat",x:"visible",a:1,q:"100% 100%",b:-105,j:"absolute",r:"inline",z:3,bS:37,bF:"289",d:124,dB:"img",k:"div",c:221},"311":{b:26,z:1,K:"None",c:153,L:"None",d:21,aS:0,M:0,e:1,N:0,aT:0,bS:37,O:0,g:"rgba(240, 239, 255, 0.100)",aU:0,P:0,bF:"306",aV:0,j:"absolute",k:"div",aI:25,aJ:25,aK:25,aL:25,A:"#ECECEC",B:"#ECECEC",C:"#ECECEC",s:"Roboto",D:"#ECECEC",t:48,dY:[],G:"#5D64A4",w:"<br>",x:"visible",I:"None",a:17,J:"None"},"339":{b:8,z:3,K:"None",c:76,L:"None",d:142,aS:0,M:0,e:1,N:0,aT:0,bS:37,O:0,g:"rgba(240, 239, 255, 0.100)",aU:0,P:0,bF:"337",aV:0,j:"absolute",k:"div",aI:25,aJ:25,aK:25,aL:25,A:"#ECECEC",B:"#ECECEC",C:"#ECECEC",s:"Roboto",D:"#ECECEC",t:48,dY:[],G:"#5D64A4",w:"<br>",x:"visible",I:"None",a:7,J:"None"},"346":{x:"visible",bF:"289",k:"div",c:91,d:22,z:22,a:263,bS:37,j:"absolute",b:-54},"291":{x:"visible",dY:[["data-visibility","!!isQueryResult"]],k:"div",c:333,d:273,z:3,a:21,j:"absolute",bF:"290",b:126},"305":{x:"visible",b:187,k:"div",c:374,d:124,z:19,r:"inline",a:1,bS:37,j:"absolute",bF:"289"},"312":{x:"visible",k:"div",c:187,d:124,z:1,a:187,j:"absolute",bF:"305",b:0},"347":{w:"",h:"276",p:"no-repeat",x:"visible",a:0,q:"100% 100%",b:3,j:"absolute",r:"inline",z:1,bF:"346",dB:"img",d:18,aA:{a:[{p:5,j:"https://twitter.com/Reborn_XRPS",k:false}]},k:"div",c:18,aP:"pointer"},"292":{b:40,z:7,K:"None",c:128,L:"None",d:18,M:0,N:0,O:0,g:"#5D64A4",P:0,bF:"291",j:"absolute",aI:10,k:"div",aJ:10,aK:10,aL:10,A:"#ECECEC",B:"#ECECEC",r:"inline",C:"#ECECEC",s:"Roboto",D:"#ECECEC",t:14,dY:[["data-visibility","txResult.op.status===0"]],F:"center",G:"#ECECEC",w:"<span style=\"color: rgb(236, 236, 236);\">Pending</span><br>",x:"visible",I:"None",a:103,J:"None"},"306":{x:"visible",k:"div",c:187,d:124,z:3,a:0,j:"absolute",bF:"305",b:0},"313":{aU:8,G:"#ECECEC",c:52,aV:8,r:"inline",d:10,s:"Helvetica,Arial,Sans-Serif",t:18,Y:14,aX:0,Z:"break-word",w:"- 100]",dY:[],j:"absolute",x:"visible",bF:"312",k:"div",y:"preserve",z:5,aS:8,aT:8,a:119,F:"left",b:21},"320":{x:"visible",bF:"289",k:"div",c:333,d:316,z:4,a:21,bS:37,j:"absolute",b:325},"348":{w:"",h:"278",p:"no-repeat",x:"visible",a:40,q:"100% 100%",b:0,j:"absolute",r:"inline",z:2,bF:"346",dB:"img",d:21,aA:{a:[{p:5,j:"https://github.com/xrpscript",k:false}]},k:"div",c:21,aP:"pointer"},"293":{b:0,z:1,K:"Solid",c:329,L:"Solid",d:269,aS:0,M:2,e:1,N:2,aT:0,bS:37,O:2,g:"rgba(240, 239, 255, 0.100)",aU:0,P:2,bF:"291",aV:0,j:"absolute",k:"div",aI:25,aJ:25,aK:25,aL:25,A:"#ECECEC",B:"#ECECEC",C:"#ECECEC",s:"Roboto",D:"#ECECEC",t:48,dY:[],G:"#5D64A4",w:"<br>",x:"visible",I:"Solid",a:0,J:"Solid"},"307":{aU:8,G:"#ECECEC",c:171,aV:8,r:"inline",d:5,s:"Roboto",t:10,Z:"break-word",w:"<span style=\"color: rgb(236, 236, 236);\">10.000000%</span>",dY:[["data-content","freeMintRate"]],j:"absolute",x:"visible",bF:"306",k:"div",y:"preserve",z:7,aS:8,aT:8,a:0,F:"center",b:100},"314":{b:26,z:1,K:"None",c:51,L:"None",d:21,aS:0,M:0,e:1,N:0,aT:0,bS:37,O:0,g:"rgba(240, 239, 255, 0.100)",aU:0,P:0,bF:"312",aV:0,j:"absolute",k:"div",aI:25,aJ:25,aK:25,aL:25,A:"#ECECEC",B:"#ECECEC",C:"#ECECEC",s:"Roboto",D:"#ECECEC",t:48,dY:[],G:"#5D64A4",w:"<br>",x:"visible",I:"None",a:68,J:"None"},"321":{b:7,z:3,K:"Solid",c:285,L:"Solid",d:102,M:2,e:1.12921451,bD:"none",N:2,cQ:1,bS:39,O:2,g:"#25A767",cR:1,P:2,dB:"button",bF:"320",j:"absolute",k:"div",aI:25,aJ:25,aK:25,aL:25,A:"#25A767",Y:96,B:"#25A767",r:"inline",C:"#25A767",s:"Roboto",D:"#25A767",t:18,dY:[],F:"center",G:"#ECECEC",aP:"default",w:"\ud83e\udee1 &nbsp;Inscription Sent \ud83d\udc4c<br>",x:"visible",I:"Solid",a:17,J:"Solid"},"349":{b:56,z:5,K:"Solid",c:158,L:"Solid",d:19,M:2,e:1,bD:"none",N:2,bS:37,O:2,dB:"button",P:2,bF:"330",j:"absolute",k:"div",aI:10,aJ:10,aK:10,aL:10,A:"#ECECEC",B:"#ECECEC",r:"inline",C:"#ECECEC",s:"Roboto",D:"#ECECEC",t:16,dY:[["data-visibility","account === undefined && isMobileBrowser()"]],F:"center",aA:{a:[{p:4,h:"22"}]},G:"#ECECEC",aP:"pointer",w:"Connect SoloDex",x:"visible",I:"Solid",a:32,J:"Solid"},"294":{aU:8,G:"#ECECEC",aV:8,r:"inline",s:"Helvetica,Arial,Sans-Serif",t:16,Z:"break-word",w:"Transaction Data<br>",bF:"291",j:"absolute",x:"visible",yy:"nowrap",k:"div",y:"preserve",z:3,aS:8,aT:8,a:98,F:"center",b:0},"308":{b:29,z:2,K:"None",c:140,L:"None",d:15,aS:0,M:0,e:1,N:0,aT:0,bS:37,O:0,g:"#D59000",aU:0,P:0,bF:"306",aV:0,i:"bufferingProcess",j:"absolute",k:"div",aI:25,aJ:25,aK:25,aL:25,A:"#ECECEC",B:"#ECECEC",r:"inline",C:"#ECECEC",s:"Roboto",D:"#ECECEC",t:48,dY:[],G:"#5D64A4",w:"<br>",x:"visible",I:"None",a:23,J:"None"},"315":{aU:8,G:"#ECECEC",c:171,bS:36,aV:8,r:"inline",d:10,s:"Helvetica,Arial,Sans-Serif",t:11,Z:"break-word",w:"Last Cycle Best GPA",bF:"312",j:"absolute",x:"visible",k:"div",y:"preserve",z:2,aS:8,aT:8,a:0,F:"center",b:-2},"322":{b:290,z:4,K:"Solid",c:329,L:"Solid",d:22,M:2,e:1,bD:"none",N:2,bS:37,O:2,dB:"button",P:2,bF:"320",j:"absolute",k:"div",aI:10,aJ:10,aK:10,aL:10,A:"#ECECEC",B:"#ECECEC",C:"#ECECEC",s:"Roboto",D:"#ECECEC",t:18,aA:{a:[{p:4,h:"27"}]},F:"center",G:"#ECECEC",aP:"pointer",w:"Inscript",x:"visible",I:"Solid",a:0,J:"Solid"},"295":{b:69,z:2,K:"None",c:300,L:"None",d:181,aS:0,M:0,e:1,N:0,aT:0,bS:37,O:0,aU:0,P:0,bF:"291",aV:0,j:"absolute",k:"div",aI:25,aJ:25,aK:25,aL:25,A:"#ECECEC",B:"#ECECEC",C:"#ECECEC",s:"Roboto",D:"#ECECEC",t:14,dY:[["data-content","queryResult"]],G:"#ECECEC",w:"Result",x:"visible",I:"None",a:17,J:"None"},"323":{x:"visible",bF:"320",k:"div",c:226,aP:"default",d:26,z:2,a:54,bS:37,j:"absolute",b:221},"330":{x:"visible",bF:"289",k:"div",c:226,d:157,z:15,a:128,bS:37,j:"absolute",b:19},"309":{aU:8,G:"#ECECEC",c:171,bS:36,aV:8,r:"inline",d:59,s:"Helvetica,Arial,Sans-Serif",t:11,Z:"break-word",w:"*&nbsp;within each cycle of 100 blocks, only the first `mint` operation from the same address will be counted.<br>* the lowest `mint` rate is<br>",bF:"306",j:"absolute",x:"visible",k:"div",y:"preserve",z:4,aS:8,aT:8,a:0,F:"center",b:47},"316":{aU:8,G:"#ECECEC",c:35,aV:8,r:"inline",d:10,s:"Helvetica,Arial,Sans-Serif",t:18,Y:14,aX:0,Z:"break-word",w:"1",dY:[["data-content","lastBestGpa"]],j:"absolute",x:"visible",bF:"312",k:"div",y:"preserve",z:3,aS:8,aT:8,a:68,F:"center",b:22},"296":{G:"#ECECEC",aI:10,c:128,d:18,I:"None",J:"None",s:"Roboto",t:14,K:"None",g:"#25A767",L:"None",M:0,w:"<span style=\"color: rgb(236, 236, 236);\">Success</span><br>",bF:"291",j:"absolute",N:0,O:0,B:"#ECECEC",P:0,x:"visible",C:"#ECECEC",A:"#ECECEC",z:4,D:"#ECECEC",aK:10,dY:[["data-visibility","txResult.op.status===1"]],aJ:10,k:"div",a:103,F:"center",aL:10,b:40},"317":{aU:8,G:"#ECECEC",c:171,bS:36,aV:8,r:"inline",d:62,s:"Helvetica,Arial,Sans-Serif",t:11,Z:"break-word",w:"<span style=\"text-align: center;\">* the best `gpa` to `mint` <br><br>requested amount </span>in the last cycle.<span style=\"color: rgb(236, 236, 236); font-family: Helvetica, Arial, sans-serif; font-size: 11px; text-align: center;\"><br>* `amount`&nbsp;</span>includes a precision of six decimal places.<span style=\"color: rgb(236, 236, 236); font-family: Helvetica, Arial, sans-serif; font-size: 11px; text-align: center;\"><br></span>",bF:"312",j:"absolute",x:"visible",k:"div",y:"preserve",z:6,aS:8,aT:8,a:0,F:"center",b:47},"324":{b:0,z:1,K:"Solid",c:222,L:"Solid",d:22,M:2,e:1,bD:"none",N:2,bS:37,O:2,g:"#D87385",dB:"button",P:2,bF:"323",j:"absolute",k:"div",aI:25,aJ:25,aK:25,aL:25,A:"#D87385",B:"#D87385",C:"#D87385",s:"Roboto",D:"#D87385",t:18,dY:[["data-visibility","!!JSONError"]],F:"center",G:"#ECECEC",aP:"default",w:"Check JSON Formation<br><br>",x:"visible",I:"Solid",a:0,J:"Solid"},"331":{b:56,z:4,K:"Solid",c:158,L:"Solid",d:19,M:2,e:1,bD:"none",N:2,bS:37,O:2,dB:"button",P:2,bF:"330",j:"absolute",k:"div",aI:10,aJ:10,aK:10,aL:10,A:"#ECECEC",B:"#ECECEC",r:"inline",C:"#ECECEC",s:"Roboto",D:"#ECECEC",t:16,dY:[["data-visibility","account === undefined && !isMobileBrowser()"]],F:"center",aA:{a:[{p:4,h:"22"}]},G:"#ECECEC",aP:"pointer",w:"Connect GemWallet",x:"visible",I:"Solid",a:32,J:"Solid"},"289":{x:"visible",k:"div",c:375,d:1595,z:5,a:0,bS:45,j:"absolute",b:85},"297":{b:40,z:5,K:"None",c:128,L:"None",d:18,M:0,N:0,O:0,g:"#D87385",P:0,bF:"291",j:"absolute",aI:10,k:"div",aJ:10,aK:10,aL:10,A:"#ECECEC",B:"#ECECEC",r:"inline",C:"#ECECEC",s:"Roboto",D:"#ECECEC",t:14,dY:[["data-visibility","txResult.op.status===-1"]],F:"center",G:"#ECECEC",w:"<span style=\"color: rgb(236, 236, 236);\">Failed</span><br>",x:"visible",I:"None",a:103,J:"None"},"318":{aU:8,G:"#ECECEC",c:171,aV:8,r:"inline",d:2,s:"Roboto",t:10,Z:"break-word",w:"<span style=\"color: rgb(236, 236, 236);\">100.000000%</span>",dY:[["data-content","gapMaxRate"]],j:"absolute",x:"visible",bF:"312",k:"div",y:"preserve",z:7,aS:8,aT:8,a:0,F:"center",b:62},"325":{b:0,z:2,K:"Solid",c:222,L:"Solid",d:22,M:2,e:1,bD:"none",N:2,bS:37,O:2,g:"#D87385",dB:"button",P:2,bF:"323",j:"absolute",k:"div",aI:25,aJ:25,aK:25,aL:25,A:"#D87385",B:"#D87385",r:"none",C:"#D87385",s:"Roboto",D:"#D87385",t:18,dY:[["data-visibility","(!account) || (!!walletError)"]],F:"center",G:"#ECECEC",aP:"default",w:"Wallet Disconnected<br>",x:"visible",I:"Solid",a:0,J:"Solid"},"332":{b:56,z:6,K:"Solid",c:158,L:"Solid",d:19,M:2,e:1,bD:"none",N:2,bS:37,O:2,g:"#25A767",dB:"button",P:2,bF:"330",j:"absolute",k:"div",aI:10,aJ:10,aK:10,aL:10,A:"#25A767",B:"#25A767",r:"inline",C:"#25A767",s:"Roboto",D:"#25A767",t:18,dY:[["data-content","account"],["data-visibility","!!account"]],F:"center",aA:{a:[{p:4,h:"24"}]},G:"#ECECEC",aP:"pointer",w:"Disconnect",x:"visible",I:"Solid",a:32,J:"Solid"},"298":{b:40,z:6,K:"None",c:128,L:"None",d:18,M:0,N:0,O:0,g:"#D59000",P:0,bF:"291",j:"absolute",aI:10,k:"div",aJ:10,aK:10,aL:10,A:"#ECECEC",B:"#ECECEC",r:"inline",C:"#ECECEC",s:"Roboto",D:"#ECECEC",t:14,dY:[["data-visibility","txResult.op.status===2"]],F:"center",G:"#ECECEC",w:"<span style=\"color: rgb(236, 236, 236);\">Buffering</span><br>",x:"visible",I:"None",a:103,J:"None"},"319":{aU:8,G:"#ECECEC",c:52,aV:8,r:"inline",d:10,s:"Helvetica,Arial,Sans-Serif",t:18,Y:14,aX:0,Z:"break-word",w:"(0 -",dY:[],j:"absolute",x:"visible",bF:"312",k:"div",y:"preserve",z:4,aS:8,aT:8,a:0,F:"right",b:22},"326":{x:"visible",bF:"320",k:"div",c:333,d:274,z:1,a:0,bS:37,j:"absolute",b:0},"333":{b:102,z:8,K:"Solid",c:177,L:"Solid",d:32,M:2,e:1,bD:"none",N:2,cQ:1,bS:37,O:2,cR:1,g:"#5D64A4",P:2,dB:"button",bF:"330",bU:0.5,j:"absolute",k:"div",aI:15,aJ:15,aK:15,aL:15,A:"#5D64A4",B:"#5D64A4",C:"#5D64A4",s:"Roboto",D:"#5D64A4",t:22,dY:[["data-content","balance"]],F:"center",G:"#ECECEC",aP:"default",w:"Balance<br>",x:"visible",I:"Solid",a:22,J:"Solid"},"340":{aU:8,G:"#ECECEC",c:75,bS:37,aV:8,r:"inline",d:18,s:"Roboto",t:11,Z:"break-word",w:"/ 210,000,000<br>",bF:"337",j:"absolute",x:"visible",k:"div",y:"preserve",z:6,aS:8,aT:8,a:-1,F:"center",b:122},"299":{b:76,z:6,K:"Solid",c:329,L:"Solid",d:22,M:2,e:1,bD:"none",N:2,bS:37,O:2,dB:"button",P:2,bF:"290",j:"absolute",k:"div",aI:10,aJ:10,aK:10,aL:10,A:"#ECECEC",B:"#ECECEC",C:"#ECECEC",s:"Roboto",D:"#ECECEC",t:18,aA:{a:[{p:4,h:"113"}]},F:"center",G:"#ECECEC",aP:"pointer",w:"Search",x:"visible",I:"Solid",a:21,J:"Solid"},"327":{b:0,z:1,K:"Solid",c:329,L:"Solid",d:270,aS:0,M:2,e:1,N:2,aT:0,bS:37,O:2,g:"rgba(240, 239, 255, 0.100)",aU:0,P:2,bF:"326",aV:0,j:"absolute",k:"div",aI:25,aJ:25,aK:25,aL:25,A:"#ECECEC",B:"#ECECEC",C:"#ECECEC",s:"Roboto",D:"#ECECEC",t:48,dY:[],G:"#5D64A4",w:"<br>",x:"visible",I:"Solid",a:-2,J:"Solid"},"334":{b:-1,z:1,K:"Solid",c:222,L:"Solid",d:154,aS:0,M:2,e:1,N:2,aT:0,bS:37,O:2,g:"rgba(240, 239, 255, 0.100)",aU:0,P:2,bF:"330",aV:0,j:"absolute",k:"div",aI:25,aJ:25,aK:25,aL:25,A:"#ECECEC",B:"#ECECEC",C:"#ECECEC",s:"Roboto",D:"#ECECEC",t:48,dY:[],G:"#5D64A4",w:"<br>",x:"visible",I:"Solid",a:0,J:"Solid"},"341":{aU:8,G:"#ECECEC",c:75,aV:8,r:"inline",d:13,s:"Roboto",t:16,Z:"break-word",w:"<span style=\"color: rgb(236, 236, 236);\">-</span>",dY:[["data-content","syncedLedger"]],j:"absolute",x:"visible",bF:"337",k:"div",y:"preserve",z:7,aS:8,aT:8,a:0,F:"center",b:54},"328":{b:12,z:2,K:"None",c:297,L:"None",d:242,aS:0,M:0,e:1,N:0,aT:0,bS:37,O:0,aU:0,P:0,bF:"326",aV:0,i:"memoData",j:"absolute",k:"div",aI:25,aJ:25,aK:25,aL:25,A:"#ECECEC",B:"#ECECEC",C:"#ECECEC",s:"Roboto",D:"#ECECEC",t:24,dY:[["contenteditable","plaintext-only"]],G:"#ECECEC",w:"{\"op\":\"mint\",\"amount\":\"100000000\",\"gpa\":\"0\"}<innerhtmldiv class=\"HYPE_InnerHTML_Div\" style=\"width: 297px; height: 242px; transform: none; -webkit-user-select: auto; overflow-wrap: normal; outline: currentcolor;\" contenteditable=\"true\"></innerhtmldiv>",x:"visible",I:"None",a:18,J:"None"},"300":{b:-1,z:7,K:"Solid",c:331,L:"Solid",d:60,aS:0,M:2,e:1,N:2,aT:0,bS:37,O:2,g:"rgba(240, 239, 255, 0.100)",aU:0,P:2,bF:"290",aV:0,j:"absolute",k:"div",aI:25,aJ:25,aK:25,aL:25,A:"#ECECEC",B:"#ECECEC",r:"inline",C:"#ECECEC",s:"Roboto",D:"#ECECEC",t:48,dY:[],G:"#5D64A4",w:"<br>",x:"visible",I:"Solid",a:19,J:"Solid"},"335":{aU:8,G:"#ECECEC",c:210,aV:8,r:"inline",d:11,s:"Helvetica,Arial,Sans-Serif",t:16,Z:"break-word",w:"<span style=\"color: rgb(236, 236, 236);\">Account</span>",bF:"330",j:"absolute",x:"visible",k:"div",y:"preserve",z:9,aS:8,aT:8,a:0,F:"center",b:6},"342":{aU:8,G:"#ECECEC",c:75,bS:36,aV:8,r:"inline",d:18,s:"Roboto",t:11,Z:"break-word",w:"Total Supply<br>",bF:"337",j:"absolute",x:"visible",k:"div",y:"preserve",z:5,aS:8,aT:8,a:0,b:81},"336":{aU:8,G:"#ECECEC",c:316,bS:36,aV:8,r:"inline",d:183,s:"Helvetica,Arial,Sans-Serif",t:11,Z:"break-word",w:"<span style=\"color: rgb(236, 236, 236); font-family: Helvetica, Arial, sans-serif; font-size: 11px; font-style: normal; font-variant-caps: normal; letter-spacing: normal; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; word-spacing: 0px; background-color: rgb(18, 26, 33); text-decoration: none;\">*&nbsp;The XRP Ledger does not natively accommodate non-fungible tokens or inscriptions akin to those utilized by Bitcoin.<br></span><span style=\"color: rgb(236, 236, 236); font-family: Helvetica, Arial, sans-serif; text-align: center;\">* A</span>n innovative approach has been adopted which involves the incorporation of inscription data into the memo segment of ledger transactions.<span style=\"color: rgb(236, 236, 236); font-family: Helvetica, Arial, sans-serif; text-align: center;\"><br>* This is&nbsp;</span><span style=\"color: rgb(236, 236, 236); font-family: Helvetica, Arial, sans-serif; text-align: center;\">an experimental project without any guarantees.<br></span><span style=\"color: rgb(236, 236, 236); font-family: Helvetica, Arial, sans-serif; text-align: center;\">* Any interaction involving more than 0.000001 XRP should be considered as a donation</span>.<br>*&nbsp;You should not expect to derive any profits from the endeavors of the project's team.<br>*&nbsp;Partial concealment mechanisms will only be disclosed at an appropriate time.<br>* The indexer will be open-sourced only after all the mechanisms have been made public.<br><br>",bF:"289",j:"absolute",x:"visible",k:"div",y:"preserve",z:21,aS:8,aT:8,a:21,F:"left",b:655},"301":{b:6,z:8,K:"None",c:300,L:"None",d:43,aS:0,M:0,e:1,N:0,aT:0,bS:37,O:0,dB:"button",aU:0,P:0,bF:"290",aV:0,i:"txHash",j:"absolute",k:"div",aI:25,aJ:25,aK:25,aL:25,A:"#ECECEC",B:"#ECECEC",r:"inline",C:"#ECECEC",s:"Roboto",D:"#ECECEC",t:14,dY:[["contenteditable","plaintext-only"]],aA:{a:[{p:4,h:"137"}]},G:"#ECECEC",aP:"pointer",w:"enter transaction hash ...",x:"visible",I:"None",a:36,J:"None"},"329":{h:"31",p:"no-repeat",x:"visible",a:146,q:"100% 100%",b:28,j:"absolute",r:"none",z:3,bS:37,bF:"326",d:38,dY:[["data-visibility","!!isLoading"]],dB:"img",i:"loading",k:"div",c:38},"343":{aU:8,G:"#ECECEC",c:74,aV:8,r:"inline",d:18,s:"Helvetica,Arial,Sans-Serif",t:16,Z:"break-word",w:"<span style=\"color: rgb(236, 236, 236);\">Network</span>",bF:"337",j:"absolute",x:"visible",k:"div",y:"preserve",z:12,aS:8,aT:8,a:0,F:"center",b:9}}}],{},h,{f:{p:0,q:[[0,0,0.1971,0,0.3391,0.8944,0.3636,1],[0.3636,1,0.3636,1,0.4425,0.75,0.5455,0.75],[0.5455,0.75,0.6519,0.75,0.7273,1,0.7273,1],[0.7273,1,0.7273,1,0.7718,0.9375,0.8182,0.9375],[0.8182,0.9375,0.8646,0.9375,0.9091,1,0.9091,1],[0.9091,1,0.9091,1,0.9294,0.9844,0.9546,0.9844],[0.9546,0.9844,0.9798,0.9844,1,1,1,1]]}},null,false,true,-1,true,true,false,true,true);d[f]=c.API;document.getElementById(g).setAttribute("HYP_dn",f);c.z_o(this.body)})();})();
