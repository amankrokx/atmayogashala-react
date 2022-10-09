var subjects = ['MySQL', 'MongoDB', 'Java'];
db.demo123.aggregate([
   {$unwind: "$ListOfSubject"},
   {$match: {ListOfSubject:{ $in:subjects}}},
   {$group: {_id: "$_id", number: {$sum: 1}}},
   {$project: {_id: 1, number: 1, percentage: {$divide: ["$number",subjects.length]}}},
   {$sort: {percentage: -1}}
]);