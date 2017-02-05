var heroes_data = [];
var heroes_fav_data = [];
var fTable;
var oTable;
// get inital array of heroes from api.js
$(document).ready(function () {
    getHeroesData();
});
// retry retirval of data in case of error
function retry_timer() {
    timer--;
    if (timer < 0) {
        clearInterval(countdown);
        if (heroes_data.length <= 0) {
            getHeroesData();
            timer = 5;
        }
    }
}
function toggleLoader() {
    if ($('.loader-container').hasClass('show')) {
        $('.heroes-overview-container').removeClass('hide').addClass('show');
        $('.loader-container').removeClass('show').addClass('hide');
    } else {
        $('.heroes-overview-container').removeClass('show').addClass('hide');
        $('.loader-container').removeClass('hide').addClass('show');
    }
}
function getHeroesData() {
    heroesManager.fetch(function (error_msg, data) {
        toggleLoader();
        if (!error_msg && data) {
            heroes_data = data;
            oTable = $('#overview_table').DataTable({
                rowReorder: {
                    selector: 'td:nth-child(2)'
                },
				"iDisplayLength": 50,
                responsive: true,
                "bProcessing": true,
                "pageLength": 5,
                "aLengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                "aaData": heroes_data,
                "aoColumns": [
                    {
                        "mData": "name",
                        "render": function (data, type, full, meta) {
                            return '<span class="glyphicon glyphicon-star-empty make-favorite padding-right-10 cursor-pointer"' +
                                'onclick="toggleFavorite(this);return false;"></span><span id =' + full.name + '>'
                                + full.name + '</span>';
                        }
                    },
                    {"mData": "age"},
                    {"mData": "origin"},
                    {
                        "mData": "superpowers[,]",
                        "bSortable": false,
                        "render": function (data, type, row) {
                            return data.length > 21 ? '<div title="' + data + '">' + data.substr(0, 20) + '…</div>' :
                            '<div title="' + data + '">' + data + '</div>';
                        }
                    },
                    {
                        "mData": "weaknesses[,]",
                        "bSortable": false,
                        "render": function (data, type, row) {
                            return data.length > 21 ? '<div title="' + data + '">' + data.substr(0, 20) + '…</div>' :
                            '<div title="' + data + '">' + data + '</div>';
                        }
                    },
                    {
                        "bSortable": false,
                        "render": function (data, type, full, meta) {
                            return '<img style="width:50px;height:50px;"src="../images/' + full.image + '">';
                        }
                    }
                ]
            });

            fTable = $('#favorites_table').DataTable({
                rowReorder: {
                    selector: 'td:nth-child(2)'
                },
                responsive: true,
                "oLanguage": {"sEmptyTable": "You have not saved any favorite heros."},
                "bProcessing": true,
                "pageLength": 5,
                "aLengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                "aaData": heroes_fav_data,
                "aoColumns": [
                    {
                        "mData": "name",
                        "render": function (data, type, full, meta) {
                            return '<span class="glyphicon glyphicon-star remove-favorite padding-right-10 cursor-pointer" ' +
                                'onclick="toggleFavorite(this);return false;"></span><span id =' + full.name + '>'
                                + full.name + '</span>';
                        }
                    },
                    {"mData": "age"},
                    {"mData": "origin"},
                    {
                        "mData": "superpowers[,]",
                        "bSortable": false,
                        "render": function (data, type, row) {
                            return data.length > 21 ? '<div title="' + data + '">' + data.substr(0, 20) + '…</div>' :
                            '<div title="' + data + '">' + data + '</div>';
                        }
                    },
                    {
                        "mData": "weaknesses[,]",
                        "bSortable": false,
                        "render": function (data, type, row) {
                            return data.length > 21 ? '<div title="' + data + '">' + data.substr(0, 20) + '…</div>' :
                            '<div title="' + data + '">' + data + '</div>';
                        }
                    },
                    {
                        "bSortable": false,
                        "render": function (data, type, full, meta) {
                            return '<img style="width:50px;height:50px;"src="../images/' + full.image + '">';
                        }
                    }
                ]
            });
        } else {
            toggleLoader();
        }
    });
}
function toggleFavorite(e) {
    var row_clicked = $(e).closest('tr');

    if ($('.heroes-overview-container').hasClass('show')) {
        var hero_name = $(row_clicked).children('td:first').text();
        //display as favorite in overview
        $(row_clicked).children().find('span:first').removeClass('glyphicon-star-empty').addClass('glyphicon-star');

        $.each(heroes_data, function () {
            if (this.name == hero_name) {
                //check if data exits if yes, do not add
                if (heroes_fav_data.indexOf(this) == -1) {
                    heroes_fav_data.push(this);
                }
            }
        });
    } else {
        var hero_name = $(row_clicked).children('td:first').text();
      //get the all rows from the overview so that the row with matched content can be marked as unfavorite
        $(oTable.rows().nodes()).each(function () {
            var overview_hero_name = $(this).children().closest('td').children('span:last').text();
            if (overview_hero_name == hero_name) {
                //display as unfavorite in overview
                if ($(this).children().closest('td').children('span:first').hasClass('glyphicon-star')) {
                    $(this).children().closest('td').children('span:first').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
                }
            }
        });

        var position_of_hero = -1;
        $.each(heroes_fav_data, function () {
            if (this.name == hero_name) {
                position_of_hero = heroes_fav_data.indexOf(this);
                // data exists in array that stores favorite objects
                if (heroes_fav_data.indexOf(this) > -1) {
                    //remove from favorites array
                    heroes_fav_data.splice(position_of_hero, 1);
                }
            }
        });
        if (position_of_hero > -1) {
            //remove row from favorites view
            fTable.row(position_of_hero).remove().draw();
            if (heroes_fav_data.length > 0) {
                //display favorites when data exists
                $('.heroes-overview-container').removeClass('show').addClass('hide');
                $('.heroes-favorites-container').removeClass('hide').addClass('show');
            } else {
                //display my picture when there are no favorites in the array
                $('.heroes-overview-container, .heroes-favorites-container').removeClass('show').addClass('hide');
                $('.empty-favorite-heroes-container').removeClass('hide').addClass('show');
            }
        }
    }
}

function toggleView(e) {

    if ($('.heroes-overview-container').hasClass('show')) {
        //display the favorites view
        if (heroes_fav_data.length > 0) {
            fTable.clear();
            fTable.rows.add(heroes_fav_data).draw();
        }

        if (heroes_fav_data.length > 0) {
            $('.heroes-overview-container').removeClass('show').addClass('hide');
            $('.heroes-favorites-container').removeClass('hide').addClass('show');
        } else {
            $('.heroes-overview-container').removeClass('show').addClass('hide');
            $('.empty-favorite-heroes-container').removeClass('hide').addClass('show');
        }
        fTable.responsive.recalc();
        fTable.draw();

    } else {
        //display the heroes overview
        $('.empty-favorite-heroes-container, .heroes-favorites-container').removeClass('show').addClass('hide')
        $('.heroes-overview-container').removeClass('hide').addClass('show');
    }
}