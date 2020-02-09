/**
 * A Node-like EventEmitter
 */
export class EventEmitter {
    /**
     * All event listeners attached to this object
     */
    private _eventListeners: {
        [prop: string]: Function[];
    } = {}

    /**
     * Emits an event to all listeners attached to the event
     * @param eventType - a string specifying the type of the event
     * @param args - arguments to pass to the event handler(s)
     */
    emit(eventType: string, ...args: any[]) {
        if (!(eventType in this._eventListeners)) return
        this._eventListeners[eventType].forEach(evHandler => {
            evHandler.call(this, ...args)
        })
    }

    /**
     * Attaches a listener
     * @param eventType - the event type
     * @param listener - the listener function
     */
    on(eventType: string, listener: Function) {
        if (!(eventType in this._eventListeners)) this._eventListeners[eventType] = []
        if (this._eventListeners[eventType].includes(listener)) return
        this._eventListeners[eventType].push(listener)
    }

    /**
     * Detaches a listener
     * @param eventType - the event type
     * @param listener - the listener function
     */
    removeListener(eventType: string, listener: Function) {
        if (!(eventType in this._eventListeners)) return

        const index = this._eventListeners[eventType].indexOf(listener)
        if (index >= 0) this._eventListeners[eventType].splice(index, 1)
    }
}