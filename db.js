const pg = require('pg')
const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL  || 'postgres://localhost/acme_db')

const Person = conn.define('person',
{
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})
const Place = conn.define('place',
{
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})
const Thing = conn.define('thing',
{
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

Person.belongsTo(Place)

Thing.belongsTo(Person)

const sync = async() =>
{ 
    await conn.sync({ force: true })
    const [ nycPlace, laPlace, chPlace ] = await Promise.all([
        Place.create({ name: 'NYC' }),
        Place.create({ name: 'LA' }),
        Place.create({ name: 'Chicago' })
    ]);
    
    const [ John, Mary, Muhammed ] = await Promise.all([
        Person.create({ name: 'John', placeId: nycPlace.id }),
        Person.create({ name: 'Mary', placeId: laPlace.id }),
        Person.create({ name: 'Muhammed', placeId: chPlace.id })
    ]);
    
    await Promise.all([
        Thing.create({ name: "Yo-Yo" , personId: John.id }),
        Thing.create({ name: "Laptop" , personId: Muhammed.id }),
        Thing.create({ name: "Surfboard" , personId: Mary.id })
    ]);
}

module.exports = 
{ 
    sync,
    models: {
        Person,
        Place,
        Thing
    }
}