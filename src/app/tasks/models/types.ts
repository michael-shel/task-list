export class Types {
    types: Array<any>
    constructor() {
        this.types = [
            {
                id: 'wash-dishes',
                fields: {
                    durationInHours: {
                        type: "number",
                        value: "",
                        label: "Duration In Hours",
                        rules: {
                            required: true,
                        }
                    }
                }
            },
            {
                id: 'vacuum-clean',
                fields: {
                    who: {
                        type: "text",
                        value: "",
                        label: "Who",
                        rules: {
                            required: true,
                        }
                    },
                    room: {
                        type: "text",
                        value: "",
                        label: "Room",
                        rules: {
                            required: true,
                        }
                    }
                }
            }
        ]
    }
}