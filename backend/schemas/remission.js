const { z } = require('zod');

const remissionSchema = z.object({
    requestId: z.number().int(),
    referredUserId: z.number().int(),
    assignedUserId: z.number().int().nullable(),
    serviceId: z.number().int(),
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
});

module.exports = remissionSchema;
