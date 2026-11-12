const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connect } = require('mongoose');
const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const app = express();
app.use(express.json());
app.use(cors());

const ConnectionDB = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log('MongoDB connection error:', error.message);
    }

}

ConnectionDB();

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));


// Routes



const { types } = require('./router/typesRouter')
app.use('/types', types)

const { delivery_method } = require('./router/delivery_methodRoute')
app.use('/delivery_method', delivery_method)


const { lang } = require('./router/langRouter')
app.use('/lang', lang)

const { payment_method } = require('./router/payment_methodRoute')
app.use('/payment_method', payment_method)

const { region } = require('./router/regionRouter')
app.use('/region', region)


const { seat_type } = require('./router/seat_typeRouter')
app.use('/seat_type', seat_type)

const { ticket_status } = require('./router/ticket_statusRouter')
app.use('/ticket_status', ticket_status)

const { destricts } = require('./router/destrictRouter')
app.use('/destricts', destricts)

const { venues } = require('./router/venueRouter')
app.use('/venues', venues)

const { venue_types } = require('./router/venueTypesRouter')
app.use('/venue_types', venue_types)

const { venue_photos } = require('./router/venue_photoRouter')
app.use('/venue_photos', venue_photos)


const { booking } = require('./router/bookingRouter')
app.use('/booking', booking)

const { cart } = require('./router/cartRouter')
app.use('/cart', cart)

const { customer_address } = require('./router/customer_addressRouter')
app.use('/customer_address', customer_address)


const { customer_cart } = require('./router/customer_cartRouter')
app.use('/customer_cart', customer_cart)


const { customer } = require('./router/customerRouter')
app.use('/customer', customer)


const { event } = require('./router/eventRouter')
app.use('/event', event)


const { human } = require('./router/human_categoryRouter')
app.use('/human', human)


const { seat } = require('./router/seatRouter')
app.use('/seat', seat)

const { ticket } = require('./router/ticketRouter')
app.use('/ticket', ticket)

const { event_type } = require('./router/event_typeRouter')
app.use('/event_type', event_type)

const { cart_items } = require('./router/cart_itemRouter')
app.use('/cart_items', cart_items)

const { admin } = require('./router/adminRouter')
app.use('/admin', admin)



const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3003',
            },
        ],
    },
    apis: ['./router/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));




