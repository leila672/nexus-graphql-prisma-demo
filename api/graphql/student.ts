import { objectType, extendType, nonNull, intArg, stringArg } from "nexus";

export const Student = objectType({
  name: "Student",
  definition(t) {
    t.nonNull.int("id"),
      t.nonNull.string("name"),
      t.nonNull.int("age"),
      t.field("subject", {
        // 1
        type: "Subject",
        resolve(parent, args, context) {
          // 2
          return context.db.student
            .findUnique({ where: { id: parent.id } })
            .subject();
        },
      });
  },
});

export const studentquery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("allstudents", {
      type: "Student",
      resolve(_root, args, ctx) {
        return ctx.db.student.findMany();
      },
    });
    t.nonNull.list.nonNull.field("student", {
      type: "Student",
      args: {
        id: nonNull(intArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.db.student.findMany({ where: { id: args.id } });
      },
    });
  },
});

export const studentmutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.list.nonNull.field("addstudent", {
      type: "Student",
      args: {
        name: nonNull(stringArg()),
        age : nonNull(intArg()),
        
      },
      resolve(_root, args, ctx) {
        const newstudent = ctx.db.student.create({
          data: {
            name: args.name,
            age : args.age , 
            
          },
        });
        return newstudent;
      },
    });
  },
});
