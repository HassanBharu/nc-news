const { expect } = require('chai')
const { formatArticleData, formatCommentData } = require('.././db/utils/function')

describe('formatArticleData', () => {
    it('should return a new array if an empty array has been passed', () => {
        const input = []
        const actual = formatArticleData(input)
        const expected = []
        expect(actual).to.eql(expected)
        expect(actual).to.not.equal(expected)
    })
    it('should return one formatted article if passed a formatted topic and user', () => {
        const article = [{
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            created_at: 1542284514171,
            votes: 100
        },
        {
            title: 'Living in the shadow of a great man',
            topic: 'cats',
            author: 'icellusedkars',
            body: 'I find this existence challenging',
            created_at: 1542284514171,
            votes: 100
        }]

        const topic = [{
            description: 'The man, the Mitch, the legend',
            slug: 'mitch'
        }, {
            description: 'Not dogs',
            slug: 'cats',
        }]

        const user = [{
            username: 'butter_bridge',
            name: 'jonny',
            avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
        }, {
            username: 'icellusedkars',
            name: 'jonny',
            avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
        }]

        const actual = formatArticleData(article, topic, user)
        const expected = [{
            title: 'Living in the shadow of a great man',
            body: 'I find this existence challenging',
            topic: 'mitch',
            votes: 100,
            author: 'butter_bridge'
        }, {
            title: 'Living in the shadow of a great man',
            topic: 'cats',
            author: 'icellusedkars',
            body: 'I find this existence challenging',
            votes: 100
        }]

        expect(actual).to.eql(expected)
        expect(actual).to.not.equal(expected)

    })
})

describe.only('#formatCommentData', () => {
    it('should return a new array if an empty array has been passed', () => {
        const input = []
        const actual = formatCommentData(input)
        const expected = []
        expect(actual).to.eql(expected)
        expect(actual).to.not.equal(expected)
    })
    it('should format one comment data if one article and user has been passed', () => {


        const comment = [{
            body:
                "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
            belongs_to: "They're not exactly dogs, are they?",
            created_by: 'butter_bridge',
            votes: 16,
            created_at: 1511354163389
        }]

        const article = [{
            article_id: 1,
            title: "They're not exactly dogs, are they?",
            body: 'I find this existence challenging',
            topic: 'mitch',
            votes: 100,
            author: 'butter_bridge'
        }]

        const user = [{
            username: 'butter_bridge',
            name: 'jonny',
            avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
        }]

        const actual = formatCommentData(comment, article, user)
        const expected = [{
            author: 'butter_bridge',
            article_id: 1,
            votes: 16,
            body:
                "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"

        }]

        expect(actual).to.eql(expected)
        expect(actual).to.not.equal(expected)

    })
})