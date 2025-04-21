from django.urls import path
from .views import Rune_View, Fragment_View, Item_View


urlpatterns = [
    path('', Fragment_View.as_view(), name='fragment'),
    path('fragment/<int:fragment_id>/', Fragment_View.as_view(), name='fragment'),
    path('champion/<str:champion_key>/', Fragment_View.as_view(), name='fragment'),

    path('rune/', Rune_View.as_view(), name='rune'),
    path('rune/<str:rune_name>/', Rune_View.as_view(), name='rune'),

    path('item/', Item_View.as_view(), name='item'),
    path('item/<int:id>/', Item_View.as_view(), name='item'),

]
