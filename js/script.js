$(document).ready(function () {
  // Jquery Event
  $("#search").click(function () {
    // variabel
    var surah = $("#surah").val();
    var ayat = $("#ayat").val();
    // kontrol dan seleksi
    if (surah == '') {
      swal('', 'Mohon masukkan no surah dan no ayat terlebih dahulu', 'warning');
      return false;
    }
    if (parseInt(surah) <= 0 || parseInt(surah) > 114) { // jika lebih kecil 0 atau lebih besar 114 karena jumlah surah pada alquran hanya 114
      window.swal({
        title: "Checking...",
        text: "Surah tidak ditemukan",
        icon: "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif",
        button: false,
        allowOutsideClick: false
      });
      setTimeout(() => {
        window.swal({
          title: "Failed!",
          icon : 'warning',
          text: "Surah tidak ditemukan",
          timer: 500
       });
      }, 2000);
      return false;
    }
    // AJAX API
    $.ajax({
      "url": "http://api.alquran.cloud/v1/ayah/" + surah + ":" + ayat + "/" + "ar.alafasy",
      "method": "GET",
      "dataType": "json",
      // fungsi
      success: function (data) {
        window.swal({
          title: "Checking...",
          icon: "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif",
          button: false,
          allowOutsideClick: false
        });
        setTimeout(() => {
          window.swal({
            title: "Successfull!",
            icon : 'success',
            text: "Surah ditemukan",
            timer: 500
          });
        }, 2000);
        var results = data.data;
        $.each(results, function (index, value) {
          // Jquery + DOM
          $('audio').attr('src', data.data.audio);
          $('.isi-ayat').text(data.data.text);
          $('.isi-nama').text(data.data.surah.englishName);
          $('.nomor-ayat').text(data.data.surah.numberOfAyahs);
          $('.nomor-2').text(data.data.numberInSurah);
          // Jquery Effect
          $('.card-surah').show();
        });
      }
    });
  });
})