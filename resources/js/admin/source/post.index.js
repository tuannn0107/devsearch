$(document).ready(function() {
    // Setup - add a text input to each footer cell
    /*$('#tblPostList thead tr').clone(true).appendTo( '#tblPostList thead' );*/
    $('#tblPostList thead tr:eq(1) th').each( function (i) {
        /*var title = $(this).text();
        var disableSearch = $(this).attr('disableSearch');
        if (!disableSearch) {
            $(this).html( '<input type="text" style="width: 100%" placeholder="Tìm '+title+'" />' );
        } else {
            $(this).html('');
        }*/

        $( 'input', this ).on( 'keyup change', function () {
            if ( table.column(i).search() !== this.value ) {
                table
                    .column(i)
                    .search( this.value )
                    .order( [[ 1, 'asc' ]] )
                    .draw();
            }
        } );
        $( 'select', this ).on( 'keyup change', function () {
            if ( table.column(i).search() !== this.value ) {
                table
                    .column(i)
                    .search( this.value )
                    .order( [[ 1, 'asc' ]] )
                    .draw();
            }
        } );
    } );

    var table = $('#tblPostList').DataTable( {
        orderCellsTop: true,
        fixedHeader: true
    } );
} );
