let store = context.get('store')||{};
let now = Date.now();
let delay = 24*60*60*1000; // 24h * 60 min * 60 sec * 1000 ms

for(const t in store){
    if(now-store[t] > delay){
        delete store[t];
    }
}

if(!store[msg.topic]||(now - store[msg.topic]) > delay){
    store[msg.topic] = now;
    context.set('store', store);
    node.status({
        fill:"green",
        shape:"dot",
        text:Object.keys(store).length
        });
    return msg;
}else{
    node.status({
        fill:"red",
        shape:"ring",
        text:Object.keys(store).length
        });
}

return null;
