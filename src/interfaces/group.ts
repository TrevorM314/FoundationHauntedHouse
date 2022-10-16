interface Group {
    number: number, // Order of registration, unique ID
    name: string, // Name of the group or group leader
    size: number, // number of people in the group
    phone: string, // matches the format +1##########
    notifyByText: boolean,
    registrationTime: number, // Unix milliseconds
    cancelled?: boolean, // If the group does not show up or cancels ahead
    cancellationTime?: number, // Unix milliseconds. Left null for no-shows
    entryTime?: number // Unix milliseconds. When group enters haunted house
}