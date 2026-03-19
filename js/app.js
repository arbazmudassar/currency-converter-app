const URL="https://v6.exchangerate-api.com/v6/fc6d38c9dc4960c27ecdeb82/pair";

const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdown){
    for (code in countryList){
    let newOption=document.createElement("option");
    newOption.innerText=code;
    newOption.value=code;
    if(select.name==="from" && code==="USD"){
        newOption.selected="selected";
    }else if(select.name==="to" && code==="PKR"){
        newOption.selected="selected";
    }
    select.append(newOption);
}
select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
});
}
const updateflag =(element)=>{
    let code=element.value;
    let countryCode=countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }
    const url=`${URL}/${fromcurr.value}/${tocurr.value}/${amtval}`;
    let response=await fetch(url);
    let data=await response.json();
    let finalamount = data.conversion_result;
    console.log(finalamount);
    msg.innerText = `${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
});
