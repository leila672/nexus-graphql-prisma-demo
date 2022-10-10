import { objectType, extendType, nonNull, intArg } from "nexus";

export const Student = objectType({
  name: "Student",
  definition(t) {
    t.nonNull.int("id"),
      t.nonNull.string("name"),
      t.nonNull.string("age"),
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
  },
});
