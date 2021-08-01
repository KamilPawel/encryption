import React, { Component } from 'react'


const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const encrypt = (str, key) => {
    let newMessage = str.split('')
    let finalStr = newMessage
    let cnt = 0
            for (let i = 0; i < newMessage.length; i++) {
                cnt += String(key).length % i ? 7 : 17;
                finalStr[i] = String.fromCharCode((newMessage[i].charCodeAt() ^ key - cnt) ^ key)
            }

    return finalStr
}
const startMessage = "Type a message here to encrypt it"
const startMessageLen = String(startMessage).length
const startKey = getRandomNum(1, 9999999999999999)
const startKeyLen = String(startKey).length
const startEncrypt = encrypt(startMessage, startKey)

export class EncryptionForm extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            keys: startKey,
            message: startMessage,
            messageLen: startMessageLen,
            error: '',
            keyLen: startKeyLen,
            lenColor: 'black',
            encrypted: startEncrypt,
            messageColour: 'black'
        }
    }
    

    getKeys = () => {
        let randomNumber = this.getRandomNumber(1, 10)
        let keyArr = []
        for (let i = 0; i < randomNumber; i++) {
            keyArr.push(this.getRandomNumber(1, 111411))
        }
        return keyArr
    }

    getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    convertArrToText = (arr) => {
        let str = ''
        for (let i = 0; i < arr; i++) {
            if (i === arr - 1) str += String(arr[i])
            else str += String(arr[i]) + ','
        }
        return str
    }
    
    convertTextToArr = (arr) => {
        let newArr = arr.split(',')
        for (let i = 0; i < arr.length; i++) {
            newArr[i] = parseInt(newArr[i])
        }
        return newArr
    }


    filter = (string) => {
        let acceptedChars = "1234567890".split('')
        let newString = ''
        for (let i = 0; i < string.length; i++) {
            for (let j = 0; j < acceptedChars.length; j++) {
                if (string[i] === acceptedChars[j]) {
                    newString += string[i]
                }
            }
        }
        return newString
    }

    keyChange = (event) => {
        let newString = event.target.value
        newString = this.filter(newString)
        
        this.setState({
            keys: newString,
            keyLen: newString.length,
            error: newString.length < 17 ? "" : "Warning: Keys longer than 16 digits above tend not to work",
            lenColor: newString.length < 17 ? 'black' : 'red'
        })

    }

     encrypt = (str, key) => {
        let newMessage = str.split('')
        let finalStr = newMessage
        let cnt = 0
                for (let i = 0; i < newMessage.length; i++) {
                    cnt += this.state.keyLen % i ? 7 : 17;
                    finalStr[i] = String.fromCharCode((newMessage[i].charCodeAt() ^ key - cnt) ^ key)
                }

        return finalStr
    }

   messageChange = (event) => {
        let newMessage = event.target.value
        this.setState({
            message: newMessage,
            encrypted: this.encrypt(newMessage, this.state.keys),
            messageLen: newMessage.length,
            messageColour: newMessage.length <= 300 ? "black" : 'red'
        })
    }



    render() {

        window.something = this.state
        return (
            <div>
                <form>
                    <label> 
                        Keys: <input value = {this.state.keys} onChange = {this.keyChange} className = 'keyBox' type = "text" />
                    </label>
                </form>
                       <textarea onChange = {this.messageChange} value = {this.state.message}>
                         </textarea>
                <h3 style = {{color: this.state.lenColor}}>Key Length: {this.state.keyLen}</h3>
                <h3 style = {{color: this.state.messageColour}}>Message Length: {this.state.messageLen} / 300</h3>
                <h5>{this.state.encrypted}</h5>
                <h1 style = {{color: 'red'}}>{this.state.error}</h1>

            </div>
        )
    }
}

export default EncryptionForm
