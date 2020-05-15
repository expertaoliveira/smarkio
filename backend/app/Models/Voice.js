'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Helpers = use('Helpers')

const fs = require('fs')
const path = require('path')
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1')
const { IamAuthenticator } = require('ibm-watson/auth')

class Voice extends Model {

    textToSpeech = new TextToSpeechV1({
        authenticator: new IamAuthenticator({
            apikey: "Ks5QT6fdnmFNijeRKdwm9Wo9qFbMskqgekgMhiK9Ec7u",
        }),
        url: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/1bbd79f9-8a7d-462b-aa4e-3e9581932a3f',
    });

    synthesizeParams = {
        text: '',
        accept: 'audio/mp3',
        voice: 'pt-BR_IsabelaVoice',
    };

    async send (text) {
        if (text) this.synthesizeParams.text = text
        const d = new Date()
        const nameFile = `audio-${d.getSeconds()}-${d.getMinutes()}-${d.getHours()}.mp3`
        await this.textToSpeech
        .synthesize(this.synthesizeParams)
        .then(response => {
            const audio = response.result
            audio.pipe(fs.createWriteStream(`public/audio/${nameFile}`))
        })
        .catch(err => {
            console.log('error:', err)
        });

        return nameFile
    }
}

module.exports = Voice