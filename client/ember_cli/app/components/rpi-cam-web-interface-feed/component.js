import Ember from 'ember';
import config from 'ember-remoteraspberrycar/config/environment';

const { APP: { API_HOST } } = config;

export default Ember.Component.extend({
  didRender() {
    const mjpeg_img = this.$('img').get(0);
    mjpeg_img.onload = this.reloadImg.bind(this);
    mjpeg_img.onerror = this.errorImg.bind(this);
    this.reloadImg();
  },
  reloadImg() {
    this.$('img').get(0).src = `${API_HOST}/html/cam_pic.php?time=` + new Date().getTime();
  },
  errorImg() {
    setTimeout(() => {
      this.reloadImg();
    }, 100)
  }
});
