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
 {name:"Havaí Clássico",price:32.90,image:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85",description:"Uma combinação clássica, fresca e equilibrada.",groups:[
  {title:"Base",required:true,items:[["Arroz japonês",0,205,true],["Mix de folhas",0,25,false],["Arroz integral",2,190,false]]},
  {title:"Proteína",required:true,items:[["Salmão",0,180,true],["Atum",0,145,false],["Tofu grelhado",0,120,false]]},
  {title:"Acompanhamentos",items:[["Manga",0,50,true],["Pepino",0,12,true],["Cenoura",0,18,true],["Cream cheese",2,95,true],["Abacate",3,80,false],["Edamame",2,65,false]]},
  {title:"Molhos e finalização",items:[["Molho da casa",0,45,true],["Tarê",0,35,false],["Gergelim",0,18,false],["Crocante",2,75,false]]}
 ]},
 {name:"Salmão Tropical",price:39.90,image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",description:"Salmão e ingredientes tropicais em uma mistura especial.",groups:[
  {title:"Base",required:true,items:[["Arroz japonês",0,205,true],["Mix de folhas",0,25,false],["Arroz integral",2,190,false]]},
  {title:"Proteína",required:true,items:[["Salmão",0,180,true],["Atum",0,145,false],["Tofu grelhado",0,120,false]]},
  {title:"Acompanhamentos",items:[["Abacate",0,80,true],["Manga",0,50,true],["Edamame",0,65,true],["Pepino",0,12,false],["Cebola roxa",0,10,false],["Cream cheese",2,95,false]]},
  {title:"Molhos e finalização",items:[["Tarê",0,35,true],["Molho da casa",0,45,false],["Gergelim",0,18,true],["Crocante",2,75,false]]}
 ]},
 {name:"Crispy Chicken",price:34.90,image:"https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85",description:"Frango crocante com vegetais e molho especial.",groups:[
  {title:"Base",required:true,items:[["Arroz japonês",0,205,true],["Mix de folhas",0,25,false],["Arroz integral",2,190,false]]},
  {title:"Proteína",required:true,items:[["Frango crocante",0,260,true],["Frango grelhado",0,190,false],["Tofu grelhado",0,120,false]]},
  {title:"Acompanhamentos",items:[["Pepino",0,12,true],["Cenoura",0,18,true],["Repolho roxo",0,15,true],["Manga",0,50,false],["Cream cheese",2,95,false],["Edamame",2,65,false]]},
  {title:"Molhos e finalização",items:[["Molho especial",0,55,true],["Tarê",0,35,false],["Gergelim",0,18,false],["Crocante extra",2,75,false]]}
 ]},
 {name:"Veggie Fresh",price:29.90,image:"https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=900&q=85",description:"Uma opção vegetal, leve e cheia de cores.",groups:[
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
function renderBag(){const container=document.querySelector("#bag-items");container.innerHTML="";let total=0,kcal=0;bag.forEach(item=>{total+=item.price;kcal+=item.kcal;const row=document.createElement("article");row.className="bag-item";const info=document.createElement("div");const title=document.createElement("h3");title.textContent=item.name;const desc=document.createElement("p");desc.textContent=item.ingredients.join(" · ");const actions=document.createElement("div");actions.className="bag-item-actions";const remove=document.createElement("button");remove.className="remove-item";remove.type="button";remove.textContent="Remover";remove.addEventListener("click",()=>{bag=bag.filter(x=>x.id!==item.id);renderBag();});actions.append(remove);info.append(title,desc,actions);const price=document.createElement("strong");price.textContent=money(item.price);row.append(info,price);container.append(row);});if(!bag.length){container.innerHTML='<p class="bag-empty">Sua sacola está vazia. Escolha um poke delicioso!</p>';}document.querySelector("#bag-total").textContent=money(total);document.querySelector("#bag-kcal").textContent=kcal+" kcal estimadas no total";document.querySelector("#bag-count").textContent=bag.length;document.querySelector("#checkout-button").disabled=!bag.length;document.querySelector("#finalize-order").disabled=!bag.length;}
function openBag(){bagOverlay.classList.add("open");bagOverlay.setAttribute("aria-hidden","false");document.body.classList.add("modal-open","checkout-open");document.querySelector("#checkout-back")?.focus();}
function closeBag(){bagOverlay.classList.remove("open");bagOverlay.setAttribute("aria-hidden","true");document.body.classList.remove("checkout-open");if(!customizer.classList.contains("open"))document.body.classList.remove("modal-open");}
document.querySelector("#open-bag").addEventListener("click",openBag);document.querySelector("#close-bag").addEventListener("click",closeBag);document.querySelector("#checkout-back").addEventListener("click",closeBag);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeCustomizer();closeBag();}});
document.querySelector("#checkout-button").addEventListener("click",()=>{closeBag();document.querySelector("#monte").scrollIntoView({behavior:"smooth",block:"start"});});
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
paymentMethod.addEventListener("change",()=>{document.querySelectorAll("[data-payment-choice]").forEach(option=>{const radio=option.querySelector('input[type="radio"]');radio.checked=radio.value===paymentMethod.value;});});
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
 if(!paymentMethod.value){alert("Selecione uma forma de pagamento para continuar.");paymentMethod.focus();return;}
 if(!acceptTerms.checked){termsError.hidden=false;acceptTerms.focus();return;}
 const total=bag.reduce((sum,item)=>sum+item.price,0);
 const isCash=paymentMethod.value==="Dinheiro";
 const needsChange=isCash?document.querySelector('input[name="needs-change"]:checked').value:"Não se aplica";
 if(isCash&&needsChange==="Sim"&&(!changeFor.value||Number(changeFor.value)<=0)){alert("Informe o valor para o qual precisa de troco.");changeFor.focus();return;}
 const lines=bag.map((item,index)=>(index+1)+". "+item.name+" — "+money(item.price)+"\n   Itens: "+item.ingredients.join(", "));
 const paymentDetails=["Forma de pagamento: "+paymentMethod.value];
 if(isCash){paymentDetails.push("Precisa de troco: "+needsChange);if(needsChange==="Sim")paymentDetails.push("Troco para: "+money(Number(changeFor.value)));}
 const message=["Olá! Quero fazer um pedido na UaiLoha Poke 😊","",""+lines.join("\n"),"","Subtotal: "+money(total),"",...paymentDetails,"","Pedido enviado pelo site UaiLoha Poke."].join("\n");
 window.open("https://wa.me/"+temporaryOrderPhone+"?text="+encodeURIComponent(message),"_blank","noopener");
});
document.querySelector("#finalize-note").textContent="O pedido será encaminhado temporariamente para o WhatsApp (34) 99140-1087. Confira e toque em Enviar no WhatsApp.";
