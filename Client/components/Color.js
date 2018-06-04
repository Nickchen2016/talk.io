export default function colorConfig(){
    const rgb = ['rgb(255,102,102)','rgb(237,28,36)','rgb(255,242,0)','rgb(255,204,51)','rgb(255,102,255)','rgb(0,102,255)','rgb(0,0,204)','rgb(102,255,0)','rgb(102,255,153)','rgb(196,154,108)','rgb(153,102,255)','rgb(102,51,255)','rgb(102,0,153)','rgb(139,94,60)','rgb(188,190,192)'];
    const index = Math.floor(Math.random()*15);
    return rgb[index];
}