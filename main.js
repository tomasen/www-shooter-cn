var app = new Vue({
  el: '#app',
  data: {
    router: window.location.hash.substring(1),
    cn: true,
    inputFileText: "",
    placeholder: ".zip, .rar, .srt, .ssa, .ass"
  },
  methods: {
    goto: function (tag) {
      window.location.hash = "#" + tag;
      app.$data.router = tag
      // Vue.set(app.data, router, tag)
      // location.reload();
    },
    onFileChange: function (e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;

      str = e.target.value;
      if (str.lastIndexOf('\\')) {
        i = str.lastIndexOf('\\') + 1;
      } else if (str.lastIndexOf('/')) {
        i = str.lastIndexOf('/') + 1;
      }
      app.$data.placeholder = "";
      app.$data.inputFileText = str.slice(i, str.length);
    },
    submitfile: function (e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;

      var data = new FormData()
      data.append('file', files[0])
      data.append('orgname', app.$data.inputFileText)

      fetch('//www.shooter.cn/sub/upload.php', {
        method: 'POST',
        body: data
      })
    }
  }
});;
