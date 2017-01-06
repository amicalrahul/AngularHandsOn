var dataService = function () {
    var urlbase = 'http://localhost:44312';
    var schoolsUrl = "/api/home1/Schools/";
    var classroomssUrl= "/api/home1/Classrooms/";
    var activitiesUrl= "/api/home1/Activities/";
    var getAllObjectCountUrl= "/api/home1/GetAllObjectsCount/";

    getSchools = function () {
        return $.getJSON(schoolsUrl);
    }
    addSchool = function (data) {
        return $.ajax({
            url: schoolsUrl,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        });
        //return $.ajax({
        //    url: schoolsUrl,
        //    type: 'POST',
        //    data: data,
        //    processData: false,
        //    contentType: false,
        //});
    }
    updateSchool = function (data, id) {
        return $.ajax({
            url: schoolsUrl + id,
            type: 'PUT',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        });
    }
    deleteSchool = function (id) {
        return $.ajax({
            url: schoolsUrl + id,
            type: 'DELETE',
            contentType: 'application/json; charset=utf-8'
        });
    }
    return {
        getSchools: getSchools,
        addSchool: addSchool,
        updateSchool: updateSchool,
        deleteSchool: deleteSchool
    }
}();