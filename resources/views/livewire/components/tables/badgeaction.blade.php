@php
    $badge = $value ? 'badge-success' : 'badge-danger';
    $badgeLabel = $value ? 'Success' : 'Processing';
@endphp
<span class="badge {{$badge}}">{{$badgeLabel}}</span>