import z from 'zod'

 const CollectionSchema = z.object({
    id: z.string({
        required_error: "id is required"
    }),
    createDateTime: z.number({
        required_error: "create datetime is required",
        invalid_type_error: "createDateTime needs to be a number"
    }),
    updateDateTime: z.number({
        required_error: "update datetime is required",
        invalid_type_error: "updateDateTime needs to be a number"
    }),
    updateUser:z.string({
        required_error: "update user is required"
    })
})

export {CollectionSchema}