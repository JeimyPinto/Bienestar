const { z } = require('zod');

const remissionSchema = z.object({
    requestId: z.number().int(),
    referredUserId: z.number().int(),
    assignedUserId: z.number().int().nullable(),
    serviceId: z.number().int(),
    startDate: z.string().nullable(),
    endDate: z.string().nullable(),
});

module.exports = remissionSchema;
