'use strict'

const Post = use('App/Models/Post')
const Voice = use('App/Models/Voice')

class PostController {
    async index({response}) {
        let posts = await Post.all()
        
        return response.json(posts)
    }

    async store({ request, response }) {
        const post_mesage = request.only(['post'])

        const post = new Post()
        post.post = post_mesage.post

        const voice = new Voice()
        let audio = await voice.send(post.post)
        post.audio = audio

        await post.save()

        return response.status(201).json(post)
    }

    async update({ params, request, response }) {
        const post_mesage = request.only(['post'])

        const post = await Post.find(params.id)

        if(!post) {
            return response.status(404).json({ data: 'Dados não encontrados' })
        }
        post.post = post_mesage.post

        await post.save()

        return response.status(200).json(post)
    }

    async delete({ params, request, response }) {

        const post = await Post.find(params.id)

        if(!post) {
            return response.status(404).json({ data: 'Dados não encontrados' })
        }

        await post.delete()

        return response.status(204).json({ data: 'Post deletado' })
    }


}

module.exports = PostController
