// ==========================================================================
// Recipe Card Page — ingredient checklist + progress
// Veda Technology Web Development Internship — Day 11
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var checkboxes = Array.prototype.slice.call(
    document.querySelectorAll('[data-ingredient]')
  );
  var total = checkboxes.length;
  var countEl = document.getElementById('checkedCount');
  var totalEl = document.getElementById('totalCount');
  var bar = document.querySelector('.progress__bar');
  var progress = document.querySelector('.progress');

  if (totalEl) {
    totalEl.textContent = String(total);
  }
  if (progress) {
    progress.setAttribute('aria-valuemax', String(total));
  }

  function update() {
    var checked = checkboxes.filter(function (cb) { return cb.checked; }).length;
    if (countEl) {
      countEl.textContent = String(checked);
    }
    var pct = total > 0 ? Math.round((checked / total) * 100) : 0;
    if (bar) {
      bar.style.width = pct + '%';
    }
    if (progress) {
      progress.setAttribute('aria-valuenow', String(checked));
      progress.setAttribute('aria-valuetext', checked + ' of ' + total + ' ingredients checked');
    }
    checkboxes.forEach(function (cb) {
      var li = cb.closest('li');
      if (!li) return;
      if (cb.checked) {
        li.classList.add('is-checked');
      } else {
        li.classList.remove('is-checked');
      }
    });
  }

  checkboxes.forEach(function (cb) {
    cb.addEventListener('change', update);
  });

  update();
});
