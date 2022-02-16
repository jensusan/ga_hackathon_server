
import { Event } from '../models/event.js'


const index = (req, res) => {
    Event.find({owner:req.user.profile}, (err, foundEvents) => {
        if (err) console.log('Error in events#index:', err)

        if (!foundEvents) return res.json({
            message: 'No Events found in database.'
        })

        res.status(200).json({ events: foundEvents });
    })
}

const show = (req, res) => {
    Event.findById(req.params.id, (err, foundEvent) => {
        if (err) {
            console.log('Error in events#show:', err);

            if (!foundEvent) return res.json({
                message: 'There is no event with this ID in the db.'
            })

            return res.send("Incomplete event#show controller function");
        }

        res.status(200).json({
            event: foundEvent
        });
    });
};

const create = (req, res) => {
    console.log('creating', req.body);
    req.body.owner = req.user.profile
    Event.create(req.body, (err, savedEvent) => {
        if (err) console.log('Error in event#create:', err)

        // Validations and error handling here

        res.status(201).json({ event: savedEvent })
    })
}

const update = (req, res) => {
    Event.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedEvent) => {
        if (err) {
            console.log('Error in event#update:', err)

            return res.send("Incomplete event#update controller function");
        }

        res.status(200).json({
            updatedEvent
        });
    });
};

const destroy = (req, res) => {
    Event.findByIdAndDelete(req.params.id, (err, deletedEvents) => {
        if (err) {
            console.log('Error in events#destroy:', err)

            return res.send("Incomplete events#destroy controller function");
        }

        res.status(200).json(
            {
                deletedEvent
            }
        );
    });
};

export {
index, show, create, update, destroy
};
