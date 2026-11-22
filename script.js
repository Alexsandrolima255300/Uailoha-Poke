/* Inicializa o aviso de cookies imediatamente, antes dos demais scripts da página. */
(function initCookieConsent(){
  const STORAGE_KEY="UAILOHA_COOKIE_CONSENT_V1";
  const banner=document.getElementById("cookie-consent");
  const dialog=document.getElementById("cookie-dialog");
  if(!banner||!dialog)return;
  const analytics=document.getElementById("cookie-analytics");
  const marketing=document.getElementById("cookie-marketing");
  let current=null;
  try{current=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null");}catch(error){}
  const save=(stats,ads)=>{
    const consent={version:1,essential:true,analytics:!!stats,marketing:!!ads,updatedAt:new Date().toISOString()};
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(consent));}catch(error){}
    banner.hidden=true;
    if(dialog.open)dialog.close();
    document.dispatchEvent(new CustomEvent("uailoha:cookie-consent-updated",{detail:consent}));
  };
  const openSettings=()=>{
    analytics.checked=!!current?.analytics;
    marketing.checked=!!current?.marketing;
    if(!dialog.open)dialog.showModal();
  };
  // Sempre solicita a escolha novamente em cada carregamento do site.
  banner.hidden=false;
  banner.removeAttribute("hidden");
  document.getElementById("cookie-accept-all")?.addEventListener("click",()=>save(true,true));
  document.getElementById("cookie-reject-optional")?.addEventListener("click",()=>save(false,false));
  document.getElementById("cookie-customize")?.addEventListener("click",openSettings);
  document.getElementById("open-cookie-settings")?.addEventListener("click",openSettings);
  document.getElementById("cookie-dialog-close")?.addEventListener("click",()=>dialog.close());
  document.getElementById("cookie-save-rejected")?.addEventListener("click",()=>save(false,false));
  document.getElementById("cookie-save-preferences")?.addEventListener("click",()=>save(analytics.checked,marketing.checked));
  dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close();});
})();

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Abrir menu");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
/* Fluxo de personalização, cálculo e sacola — valores e calorias demonstrativos */
const pokeCatalog = [
 {name:"Havaí Clássico",price:32.90,image:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=720&q=72",description:"Uma combinação clássica, fresca e equilibrada.",groups:[
  {title:"Base",required:true,items:[["Arroz japonês",0,205,true],["Mix de folhas",0,25,false],["Arroz integral",2,190,false]]},
  {title:"Proteína",required:true,items:[["Salmão",0,180,true],["Atum",0,145,false],["Tofu grelhado",0,120,false]]},
  {title:"Acompanhamentos",items:[["Manga",0,50,true],["Pepino",0,12,true],["Cenoura",0,18,true],["Cream cheese",2,95,true],["Abacate",3,80,false],["Edamame",2,65,false]]},
  {title:"Molhos e finalização",items:[["Molho da casa",0,45,true],["Tarê",0,35,false],["Gergelim",0,18,false],["Crocante",2,75,false]]}
 ]},
 {name:"Salmão Tropical",price:39.90,image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=720&q=72",description:"Salmão e ingredientes tropicais em uma mistura especial.",groups:[
  {title:"Base",required:true,items:[["Arroz japonês",0,205,true],["Mix de folhas",0,25,false],["Arroz integral",2,190,false]]},
  {title:"Proteína",required:true,items:[["Salmão",0,180,true],["Atum",0,145,false],["Tofu grelhado",0,120,false]]},
  {title:"Acompanhamentos",items:[["Abacate",0,80,true],["Manga",0,50,true],["Edamame",0,65,true],["Pepino",0,12,false],["Cebola roxa",0,10,false],["Cream cheese",2,95,false]]},
  {title:"Molhos e finalização",items:[["Tarê",0,35,true],["Molho da casa",0,45,false],["Gergelim",0,18,true],["Crocante",2,75,false]]}
 ]},
 {name:"Crispy Chicken",price:34.90,image:"https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=720&q=72",description:"Frango crocante com vegetais e molho especial.",groups:[
  {title:"Base",required:true,items:[["Arroz japonês",0,205,true],["Mix de folhas",0,25,false],["Arroz integral",2,190,false]]},
  {title:"Proteína",required:true,items:[["Frango crocante",0,260,true],["Frango grelhado",0,190,false],["Tofu grelhado",0,120,false]]},
  {title:"Acompanhamentos",items:[["Pepino",0,12,true],["Cenoura",0,18,true],["Repolho roxo",0,15,true],["Manga",0,50,false],["Cream cheese",2,95,false],["Edamame",2,65,false]]},
  {title:"Molhos e finalização",items:[["Molho especial",0,55,true],["Tarê",0,35,false],["Gergelim",0,18,false],["Crocante extra",2,75,false]]}
 ]},
 {name:"Veggie Fresh",price:29.90,image:"https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=720&q=72",description:"Uma opção vegetal, leve e cheia de cores.",groups:[
  {title:"Base",required:true,items:[["Arroz japonês",0,205,true],["Mix de folhas",0,25,false],["Arroz integral",2,190,false]]},
  {title:"Proteína",required:true,items:[["Tofu grelhado",0,120,true],["Edamame",0,65,false],["Grão-de-bico",0,135,false]]},
  {title:"Acompanhamentos",items:[["Manga",0,50,true],["Abacate",0,80,true],["Pepino",0,12,true],["Cenoura",0,18,true],["Edamame",0,65,false],["Repolho roxo",0,15,false]]},
  {title:"Molhos e finalização",items:[["Molho da casa",0,45,true],["Tarê",0,35,false],["Gergelim",0,18,true],["Crocante",2,75,false]]}
 ]}
];
const customizer=document.querySelector("#customizer"), bagOverlay=document.querySelector("#bag-overlay");
let activePoke=null, activeSelections=[], bag=[];
const money=n=>n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
function getTotals(){let extra=0,kcal=0;activeSelections.forEach(s=>{extra+=s.price;kcal+=s.kcal});return {price:(activePoke?.price||0)+extra,kcal};}
function updateCustomizerTotals(){const t=getTotals();document.querySelector("#custom-price").textContent=money(t.price);document.querySelector("#custom-kcal").textContent=t.kcal+" kcal";}
function openCustomizer(index){activePoke=pokeCatalog[index];activeSelections=[];document.querySelector("#custom-image").src=activePoke.image;document.querySelector("#custom-image").alt=activePoke.name;document.querySelector("#custom-title").textContent=activePoke.name;document.querySelector("#custom-description").textContent=activePoke.description;const groups=document.querySelector("#ingredient-groups");groups.innerHTML="";
 activePoke.groups.forEach((group,gi)=>{const section=document.createElement("section");section.className="ingredient-group";const title=document.createElement("h3");title.textContent=group.title;section.append(title);const opts=document.createElement("div");opts.className="ingredient-options";
 group.items.forEach((item,ii)=>{const [name,price,kcal,selected]=item;const id="ing-"+gi+"-"+ii;const label=document.createElement("label");label.className="ingredient-option";const input=document.createElement("input");input.type="checkbox";input.id=id;input.checked=!!selected;input.dataset.group=gi;input.dataset.item=ii;const text=document.createElement("span");text.textContent=name;const cost=document.createElement("small");cost.textContent=price?"+ "+money(price):"Incluso";label.append(input,text,cost);opts.append(label);if(selected)activeSelections.push({name,price,kcal,group:gi});input.addEventListener("change",()=>{const chosen=activePoke.groups[gi].items[ii];if(group.required){opts.querySelectorAll('input[type="checkbox"]').forEach(other=>{if(other!==input)other.checked=false});activeSelections=activeSelections.filter(s=>s.group!==gi);if(input.checked)activeSelections.push({name:chosen[0],price:chosen[1],kcal:chosen[2],group:gi});}else{if(input.checked)activeSelections.push({name:chosen[0],price:chosen[1],kcal:chosen[2],group:gi});else activeSelections=activeSelections.filter(s=>!(s.group===gi&&s.name===chosen[0]));}updateCustomizerTotals();});});section.append(opts);groups.append(section);});
 updateCustomizerTotals();customizer.classList.add("open");customizer.setAttribute("aria-hidden","false");document.body.classList.add("modal-open");}
function closeCustomizer(){customizer.classList.remove("open");customizer.setAttribute("aria-hidden","true");if(!bagOverlay.classList.contains("open"))document.body.classList.remove("modal-open");}
document.querySelectorAll(".menu-card").forEach((card,index)=>{card.setAttribute("tabindex","0");card.setAttribute("role","button");card.setAttribute("aria-label","Personalizar "+pokeCatalog[index].name);card.addEventListener("click",()=>openCustomizer(index));card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openCustomizer(index);}});});
document.querySelector("[data-close-custom]").addEventListener("click",closeCustomizer);
customizer.addEventListener("click",e=>{if(e.target===customizer)closeCustomizer();});
document.querySelector("#add-to-bag").addEventListener("click",()=>{if(!activePoke)return;const t=getTotals();bag.push({id:Date.now()+Math.random(),name:activePoke.name,price:t.price,kcal:t.kcal,ingredients:activeSelections.map(s=>s.name)});closeCustomizer();renderBag();openBag();});
function renderBag(){const container=document.querySelector("#bag-items");container.innerHTML="";let total=0,kcal=0;bag.forEach(item=>{total+=item.price;kcal+=item.kcal;const row=document.createElement("article");row.className="bag-item";const info=document.createElement("div");const title=document.createElement("h3");title.textContent=item.name;const desc=document.createElement("p");desc.textContent=item.ingredients.join(" · ");const actions=document.createElement("div");actions.className="bag-item-actions";const remove=document.createElement("button");remove.className="remove-item";remove.type="button";remove.textContent="Remover";remove.addEventListener("click",()=>{bag=bag.filter(x=>x.id!==item.id);renderBag();});actions.append(remove);info.append(title,desc,actions);const price=document.createElement("strong");price.textContent=money(item.price);row.append(info,price);container.append(row);});if(!bag.length){container.innerHTML='<p class="bag-empty">Sua sacola está vazia. Escolha um poke delicioso!</p>';}document.querySelector("#bag-total").textContent=money(total);document.querySelector("#bag-kcal").textContent=kcal+" kcal estimadas no total";updateCheckoutTotals(total);renderCheckoutSummary(total);document.querySelector("#bag-count").textContent=bag.length;document.querySelector("#checkout-button").disabled=!bag.length;document.querySelector("#finalize-order").disabled=!bag.length;}
function openBag(){bagOverlay.classList.add("open");bagOverlay.setAttribute("aria-hidden","false");document.body.classList.add("modal-open","checkout-open");document.querySelector("#checkout-back")?.focus();}
function closeBag(){bagOverlay.classList.remove("open");bagOverlay.setAttribute("aria-hidden","true");document.body.classList.remove("checkout-open");if(!customizer.classList.contains("open"))document.body.classList.remove("modal-open");}
document.querySelector("#open-bag").addEventListener("click",openBag);document.querySelector("#close-bag").addEventListener("click",closeBag);document.querySelector("#checkout-back").addEventListener("click",closeBag);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeCustomizer();closeBag();}});
document.querySelector("#checkout-button").addEventListener("click",()=>{closeBag();document.querySelector("#monte").scrollIntoView({behavior:"smooth",block:"start"});});
const DELIVERY_FEE=15;
const deliveryFeeLabel=document.querySelector("#delivery-fee");
const grandTotalLabel=document.querySelector("#checkout-grand-total");
function selectedDeliveryType(){return document.querySelector('input[name="delivery-type"]:checked')?.value||"";}
function updateCheckoutTotals(subtotal=bag.reduce((sum,item)=>sum+item.price,0)){
 const type=selectedDeliveryType();
 const fee=type==="Entrega"?DELIVERY_FEE:0;
 deliveryFeeLabel.textContent=type==="Entrega"?money(DELIVERY_FEE):type==="Retirada"?money(0):"Selecione";
 grandTotalLabel.textContent=money(subtotal+fee);
 renderCheckoutSummary(subtotal);
}
function renderCheckoutSummary(subtotal=bag.reduce((sum,item)=>sum+item.price,0)){
 const target=document.querySelector("#checkout-order-summary"); if(!target)return;
 const type=selectedDeliveryType(), fee=type==="Entrega"?DELIVERY_FEE:0;
 const value=id=>document.querySelector(id)?.value.trim()||"";
 const rows=bag.map((item,index)=>(index+1)+". "+item.name+" — "+money(item.price));
 let receiving=type||"Não selecionado";
 if(type==="Retirada")receiving+=" — R. Afonso Rato, 146, Mercês, Uberaba/MG";
 if(type==="Entrega"){
  const address=[value("#delivery-street"),value("#delivery-number"),value("#delivery-neighborhood"),value("#delivery-city-state"),value("#delivery-cep")].filter(Boolean).join(", ");
  receiving+=" — "+(address||"Endereço ainda não informado");
  if(value("#delivery-complement"))receiving+=" · "+value("#delivery-complement");
  if(value("#delivery-reference"))receiving+=" · Referência: "+value("#delivery-reference");
 }
 const payment=document.querySelector("#payment-method")?.value||"Não selecionado";
 target.querySelector("p").textContent="Itens: "+(rows.join(" | ")||"Sacola vazia")+".\nRecebimento: "+receiving+".\nPagamento: "+payment+".\nSubtotal: "+money(subtotal)+" | Taxa: "+(type?money(fee):"A definir")+" | Total: "+(type?money(subtotal+fee):"A definir");
}
document.querySelectorAll('input[name="delivery-type"]').forEach(input=>input.addEventListener("change",()=>{
 const isDelivery=input.value==="Entrega"&&input.checked;
 document.querySelector("#delivery-address-fields").hidden=!isDelivery;
 document.querySelector("#delivery-hint").textContent=isDelivery?"Informe o endereço completo para receber seu pedido.":"Retirada no local: sem taxa de entrega.";
 updateCheckoutTotals();
}));
const cepInput=document.querySelector("#delivery-cep");
const cepStatus=document.querySelector("#cep-status"); let cepLookupSequence=0;
const addressFields={street:document.querySelector("#delivery-street"),neighborhood:document.querySelector("#delivery-neighborhood"),cityState:document.querySelector("#delivery-city-state")};
async function lookupCep(){
 const digits=cepInput.value.replace(/\D/g,""); if(digits.length!==8)return;
 const sequence=++cepLookupSequence; cepStatus.textContent="Consultando CEP…";
 try{
  const response=await fetch("https://viacep.com.br/ws/"+digits+"/json/"); if(!response.ok)throw new Error("Falha na consulta");
  const data=await response.json(); if(sequence!==cepLookupSequence)return; if(data.erro)throw new Error("CEP não encontrado");
  if(data.logradouro)addressFields.street.value=data.logradouro;
  if(data.bairro)addressFields.neighborhood.value=data.bairro;
  const cityState=[data.localidade,data.uf].filter(Boolean).join(" / "); if(cityState)addressFields.cityState.value=cityState;
  cepStatus.textContent="Endereço localizado. Confira os dados e complete manualmente o que estiver faltando."; renderCheckoutSummary();
 }catch(error){if(sequence!==cepLookupSequence)return;cepStatus.textContent="Não foi possível localizar esse CEP. Preencha rua, bairro e cidade/UF manualmente.";}
}
cepInput.addEventListener("input",()=>{
 const digits=cepInput.value.replace(/\D/g,"").slice(0,8); cepInput.value=digits.length>5?digits.slice(0,5)+"-"+digits.slice(5):digits;
 if(digits.length===8)lookupCep();else{cepLookupSequence++;cepStatus.textContent="Digite os 8 números do CEP para buscar o endereço; os campos também podem ser preenchidos manualmente.";}
 renderCheckoutSummary();
});
document.querySelectorAll("#delivery-address-fields input, #customer-name, #customer-phone").forEach(input=>input.addEventListener("input",()=>renderCheckoutSummary()));
const temporaryOrderPhone = "5534991401087";
const acceptTerms=document.querySelector("#accept-terms");
const termsError=document.querySelector("#terms-error");
const termsDialog=document.querySelector("#terms-dialog");
const openTerms=document.querySelector("#open-terms");
const closeTerms=()=>termsDialog.close();
openTerms.addEventListener("click",event=>{event.preventDefault();termsDialog.showModal();});
document.querySelector("#close-terms").addEventListener("click",closeTerms);
document.querySelector("#confirm-terms-close").addEventListener("click",closeTerms);
acceptTerms.addEventListener("change",()=>{if(acceptTerms.checked)termsError.hidden=true;});

const paymentMethod=document.querySelector("#payment-method");
const changeOptions=document.querySelector("#change-options");
const changeFor=document.querySelector("#change-for");
const changeForLabel=document.querySelector("#change-for-label");
document.querySelectorAll("[data-payment-choice]").forEach(option=>{const radio=option.querySelector('input[type="radio"]');radio.addEventListener("change",()=>{if(!radio.checked)return;paymentMethod.value=radio.value;paymentMethod.dispatchEvent(new Event("change",{bubbles:true}));});});
paymentMethod.addEventListener("change",()=>{renderCheckoutSummary();document.querySelectorAll("[data-payment-choice]").forEach(option=>{const radio=option.querySelector('input[type="radio"]');radio.checked=radio.value===paymentMethod.value;});});
paymentMethod.addEventListener("change",()=>{
 const isCash=paymentMethod.value==="Dinheiro";
 changeOptions.hidden=!isCash;
 if(!isCash){changeFor.value="";changeFor.hidden=true;changeForLabel.hidden=true;}
});
document.querySelectorAll('input[name="needs-change"]').forEach(option=>option.addEventListener("change",()=>{
 const needs=option.checked&&option.value==="Sim";
 changeFor.hidden=!needs;changeForLabel.hidden=!needs;
 if(!needs)changeFor.value="";
}));


document.querySelector("#finalize-order").addEventListener("click",()=>{
 if(!bag.length)return;
 const deliveryType=selectedDeliveryType();
 if(!deliveryType){alert("Escolha entre entrega ou retirada.");document.querySelector(".delivery-section").scrollIntoView({behavior:"smooth",block:"center"});return;}
 const customerName=document.querySelector("#customer-name").value.trim();
 const customerPhone=document.querySelector("#customer-phone").value.trim();
 if(!customerName){alert("Informe seu nome.");document.querySelector("#customer-name").focus();return;}
 if(customerPhone.replace(/\D/g,"").length<10){alert("Informe um telefone/WhatsApp válido com DDD.");document.querySelector("#customer-phone").focus();return;}
 const address={cep:document.querySelector("#delivery-cep").value.trim(),street:document.querySelector("#delivery-street").value.trim(),number:document.querySelector("#delivery-number").value.trim(),neighborhood:document.querySelector("#delivery-neighborhood").value.trim(),cityState:document.querySelector("#delivery-city-state").value.trim(),complement:document.querySelector("#delivery-complement").value.trim(),reference:document.querySelector("#delivery-reference").value.trim()};
 if(deliveryType==="Entrega"){
  if(address.cep.replace(/\D/g,"").length!==8){alert("Informe um CEP válido com 8 números.");document.querySelector("#delivery-cep").focus();return;}
  for(const field of ["street","number","neighborhood","cityState"]){if(!address[field]){alert("Preencha rua/avenida, número, bairro e cidade/UF para a entrega.");document.querySelector(field==="cityState"?"#delivery-city-state":"#delivery-"+field).focus();return;}}
 }
 if(!paymentMethod.value){alert("Selecione uma forma de pagamento para continuar.");paymentMethod.focus();return;}
 if(!acceptTerms.checked){termsError.hidden=false;acceptTerms.focus();return;}
 const subtotal=bag.reduce((sum,item)=>sum+item.price,0);
 const deliveryFee=deliveryType==="Entrega"?DELIVERY_FEE:0;
 const total=subtotal+deliveryFee;
 const isCash=paymentMethod.value==="Dinheiro";
 const needsChange=isCash?document.querySelector('input[name="needs-change"]:checked').value:"Não se aplica";
 if(isCash&&needsChange==="Sim"&&(!changeFor.value||Number(changeFor.value)<=0)){alert("Informe o valor para o qual precisa de troco.");changeFor.focus();return;}
 const lines=bag.map((item,index)=>(index+1)+". "+item.name+" — "+money(item.price)+"\n   Itens: "+item.ingredients.join(", "));
 const paymentDetails=["Forma de pagamento: "+paymentMethod.value];
 if(isCash){paymentDetails.push("Precisa de troco: "+needsChange);if(needsChange==="Sim")paymentDetails.push("Troco para: "+money(Number(changeFor.value)));}
 const orderDetails=["Cliente: "+customerName,"Telefone/WhatsApp: "+customerPhone,"Recebimento: "+deliveryType];
 if(deliveryType==="Entrega"){
  orderDetails.push("Endereço: "+address.street+", "+address.number+" — "+address.neighborhood+", "+address.cityState);
  orderDetails.push("CEP: "+address.cep);
  if(address.complement)orderDetails.push("Complemento: "+address.complement);
  if(address.reference)orderDetails.push("Ponto de referência: "+address.reference);
 }
 const message=["Olá! Quero fazer um pedido na UaiLoha Poke 😊","",...orderDetails,"",lines.join("\n"),"","RESUMO COMPLETO DO PEDIDO","Subtotal dos itens: "+money(subtotal),"Recebimento: "+deliveryType,"Taxa de entrega: "+money(deliveryFee),"TOTAL: "+money(total),"",...paymentDetails,"","Pedido enviado pelo site UaiLoha Poke."].join("\n");
 window.open("https://wa.me/"+temporaryOrderPhone+"?text="+encodeURIComponent(message),"_blank","noopener");
});
document.querySelector("#finalize-note").textContent="O pedido será encaminhado temporariamente para o WhatsApp (34) 99140-1087. Confira e toque em Enviar no WhatsApp.";
renderCheckoutSummary();


/* Revela títulos e textos à medida que a pessoa percorre a página */
(function initScrollTextReveal(){
  const revealTargets=document.querySelectorAll(
    "main h1, main h2, main h3, main p, main .eyebrow, main .hero-note, main .menu-meta, main .trust-facts span, main .review-grid blockquote, main .faq-list summary"
  );
  if(!("IntersectionObserver" in window)){
    revealTargets.forEach(element=>element.classList.add("is-visible"));
    return;
  }
  const observer=new IntersectionObserver((entries,currentObserver)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  },{threshold:0.12,rootMargin:"0px 0px -35px 0px"});
  revealTargets.forEach((element,index)=>{
    element.classList.add("scroll-reveal");
    element.style.setProperty("--reveal-delay",(index%4)*85+"ms");
    observer.observe(element);
  });
})();


