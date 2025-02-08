students && archStudents && query.studentsTab === "archive"
            ? query.search
              ? archStudents
                .filter(
                  (item: any) =>
                    item?.student?.firstname
                      .toLowerCase()
                      ?.includes(
                        (query.search as string).toString().toLowerCase()
                      ) ||
                    item?.student?.lastname
                      .toLowerCase()
                      ?.includes(
                        (query.search as string).toString().toLowerCase()
                      )
                )
                .map((item: any) => ({
                  ...item?.student,
                  key: item?.student?.id,
                  gender: item?.gender.toLowerCase(),
                  group:
                    item?.groupName && item?.courseName
                      ? `${item?.groupName || ""} - ${item?.courseName || ""}`
                      : t("form.not connected"),
                  fio: {
                    id: item?.student?.id,
                    name: `${item?.firstname || ""} ${item?.lastname || ""}`.trim(),
                  },
                }))
              : archStudents.map((item: any) => ({
                ...item,
                key: item?.id,
                group:
                  item?.groupName && item?.courseName
                    ? `${item?.groupName || ""} - ${item?.courseName || ""}`
                    : t("form.not connected"),
                gender: item?.gender.toLowerCase(),
                fio: {
                  id: item?.id,
                  name: `${item?.firstname || ""} ${item?.lastname || ""}`.trim(),
                },
              }))
            