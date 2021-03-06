## Minimal Webpath Bruteforcer

## Clone & Run

Clone & install libraries
```bash
git clone https://github.com/YashKwatra/yash92.git
cd yash92

npm i
```

Run app
```bash
npm index.js <CLI Arguments>
```

eg:
- Run ```node index.js --url="https://github.com" --file="paths.txt" --codes=200 302``` for **sample input**

## CLI Arguments
- ```--file``` argument to this must be string full file name ending with ```.txt```. eg: 
    - ```--file="paths.txt"``` is **valid**
    - ```--file="paths.tx"``` is not **valid**
    - ```--file="paths.pdf"``` is not **valid**

- ```--url``` argument to this must be a string valid url containing protocol. eg: 
    - ```--url="https://github.com"``` is **valid**
    - ```--url="http://github.com"``` is **not** **valid**
    - ```--url="github.com"``` is **not** **valid**
    - ```--url="http://github"``` is **not** **valid**

- ```--codes``` argument to this must be integers. eg:  
    - ```--codes=200 302``` is **valid**
    - ```--codes=200.5 302``` is **not** **valid**
    - ```--codes= 404 302``` is **valid**
